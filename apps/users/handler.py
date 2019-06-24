# -*- coding: utf-8 -*-
import json
from random import choice
from datetime import datetime

import jwt

from apps.users.forms import SmsCodeForm, RegisterForm, LoginForm
from apps.utils.AsyncYunPian import AsyncVerifyCode
from apps.users.models import User

from RtForum.settings import ApiKey
from RtForum.handler import RedisHandler


class LoginHandler(RedisHandler):
    """
    用户登录
    """
    async def post(self, *args, **kwargs):
        re_data = {}

        params = self.request.body.decode("utf8")
        params = json.loads(params)
        login_form = LoginForm.from_json(params)
        if login_form.validate():
            mobile = login_form.mobile.data
            password = login_form.password.data

            try:
                user = await self.application.objects.get(User, mobile=mobile)
                if not user.password.check_password(password):
                    self.set_status(400)
                    re_data['non_fields'] = "用户名或密码错误"
                else:
                    # 登录成功
                    # 生成json web token
                    payload = {
                        "id": user.id,
                        "nick_name": user.nick_name,
                        "exp": datetime.utcnow()
                    }
                    token = jwt.encode(payload, self.settings['secret_key'], algorithm='HS256')
                    re_data["id"] = user.id
                    if user.nick_name is not None:
                        re_data["nick_name"] = user.nick_name
                    else:
                        re_data["nick_name"] = user.mobile
                    re_data['token'] = token.decode("utf8")
            except User.DoesNotExist as e:
                self.set_status(400)
                re_data["mobile"] = "用户不存在"

            self.finish(re_data)


class RegisterHandler(RedisHandler):
    """
    用户注册
    """
    async def post(self, *args, **kwargs):
        re_data = {}

        params = self.request.body.decode("utf8")
        params = json.loads(params)
        # from_json为猴子补丁加入的新方法，解决json传输
        register_form = RegisterForm.from_json(params)
        if register_form.validate():
            mobile = register_form.mobile.data
            code = register_form.code.data
            password = register_form.password.data

            # 验证码是否正确
            redis_key = "{}_{}".format(mobile, code)
            if not self.redis_conn.get(redis_key):
                self.set_status(400)
                re_data["code"] = "验证码错误或者失效"
            else:
                # 验证用户是否存在
                try:
                    existed_users = await self.application.objects.get(User, mobile=mobile)
                    self.set_status(400)
                    re_data["mobile"] = "用户已经存在"
                except User.DoesNotExist as e:
                    user = await self.application.objects.create(User, mobile=mobile, password=password)
                    re_data["id"] = user.id
        else:
            self.set_status(400)
            for field in register_form.erros:
                re_data[field] = register_form.errors[field][0]

        self.finish(re_data)


class SmsHandler(RedisHandler):
    """
    发送验证码
    """
    def generate_code(self):
        """
        生成随机4位数字的验证码
        """
        seeds = "1234567890"
        random_str = []
        for i in range(4):
            random_str.append(choice(seeds))
        return "".join(random_str)

    async def post(self, *args, **kwargs):
        re_data = {}

        params = self.request.body.decode("utf8")
        params = json.loads(params)
        # from_json为猴子补丁加入的新方法，解决json传输
        sms_form = SmsCodeForm.from_json(params)
        if sms_form.validate():
            mobile = sms_form.mobile.data
            code = self.generate_code()

            verify_code = AsyncVerifyCode(ApiKey)
            re_json = await verify_code.send_single_sms(code, mobile)
            if re_json["code"] != 0:
                self.set_status(400)
                re_data["mobile"] = re_json["message"]
            else:
                # 将验证码写入到验证码中
                self.redis_conn.set("{}_{}".format(mobile, code), 1, 5*60)
        else:
            self.set_status(400)
            for field in sms_form.errors:
                re_data[field] = sms_form.errors[field][0]

        self.finish(re_data)

