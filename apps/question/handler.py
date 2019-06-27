# -*- coding: utf-8 -*-
import os
import uuid
import json
import aiofiles

from playhouse.shortcuts import model_to_dict

from RtForum.handler import RedisHandler
from apps.question.models import *
from apps.question.forms import *
from apps.utils.util_func import json_serializer
from apps.utils.rtform_decorators import authenticated_async


class QuestionHandler(RedisHandler):
    async def get(self, *args, **kwargs):
        # 获取问题列表
        re_data = []
        question_query = QuestionModel.extend()
        # 根据类别进行过滤(前端传过来的参数)
        c = self.get_argument("c", None)
        if c:
            question_query = question_query.filter(QuestionModel.category == c)
        # 根据参数进行排序
        order = self.get_argument("o", None)
        if order:
            if order == "new":
                question_query = question_query.order_by(QuestionModel.add_time.desc())
            elif order == "hot":
                question_query = question_query.order_by(QuestionModel.answer_nums.desc())
        questions = await self.application.objects.execute(question_query)
        for question in questions:
            question_dict = model_to_dict(question)
            question_dict["image"] = "{}/media/{}/".format(self.settings["SITE_URL"], question_dict["image"])
            re_data.append(question_dict)

        self.finish(json.dumps(re_data, default=json_serializer))

    @authenticated_async
    async def post(self, *args, **kwargs):
        # 添加问题
        re_data = {}

        question_form = QuestionForm(self.request.body_arguments)
        if question_form.validate():
            # 图片字段验证
            file_meta = self.request.files.get("image", None)
            if not file_meta:
                self.set_status(400)
                re_data["image"] = "请上传图片"
            else:
                # 完成图片保存并设置给对应记录
                # 通过 aiofiles 写文件
                new_filename = ""
                for meta in file_meta:
                    filename = meta["filename"]
                    new_filename = "{uuid}_{filename}".format(uuid=uuid.uuid1(), filename=filename)
                    file_path = os.path.join(self.settings["MEDIA_ROOT"], new_filename)
                    async with aiofiles.open(file_path, 'wb') as f:
                        await f.write(meta['body'])
                question = await self.application.objects.create(QuestionModel, user=self.current_user,
                                                                 category=question_form.category.data,
                                                                 title=question_form.title.data,
                                                                 content=question_form.content.data,
                                                                 image=new_filename)
                re_data["id"] = question.id
        else:
            self.set_status(400)
            for field in question_form.errors:
                re_data[field] = question_form.errors[0]

        self.finish(re_data)


class QuestionDetailHandler(RedisHandler):
    @authenticated_async
    async def get(self, question_id, *args, **kwargs):
        # 获取某一问题详情
        re_data = {}
        question_details = await self.application.objects.execute(
            QuestionModel.extend().where(QuestionModel.id == int(question_id)))
        re_count = 0
        for data in question_details:
            item_dict = model_to_dict(data)
            item_dict["image"] = "{}/media/{}/".format(self.settings["SITE_URL"], item_dict["image"])
            re_data = item_dict

            re_count += 1
        if re_count == 0:
            self.set_status(404)

        self.finish(json.dumps(re_data, default=json_serializer))


class AnswerHandler(RedisHandler):
    @authenticated_async
    async def get(self, question_id, *args, **kwargs):
        # 获取问题的所有回答
        re_data = []
        try:
            question = await self.application.objects.get(QuestionModel, id=int(question_id))
            answers = await self.application.onjects.execute(
                AnswerModel.extend().where(AnswerModel.question == question,
                                           AnswerModel.parent_answer.is_null(True)).order_by(
                    AnswerModel.add_time.desc()))
            for item in answers:
                item_dict = {
                    "user": model_to_dict(item.user),
                    "content": item.content,
                    "reply_nums": item.reply_nums,
                    "id": item.id
                }
                re_data.append(item_dict)
        except QuestionModel.DoesNotExist as e:
            self.set_status(404)
        self.finish(self.finish(json.dumps(re_data, default=json_serializer)))

    @authenticated_async
    async def post(self, question_id, *args, **kwargs):
        # 新增评论
        re_data = {}
        param = self.request.body.decode("utf8")
        param = json.loads(param)
        post_comment_form = AnswerForm.from_json(param)
        if post_comment_form.validate():
            try:
                question = await self.application.objects.get(QuestionModel, id=int(question_id))
                answer = await self.application.objects.create(AnswerModel, user=self.current_user, question=question,
                                                               content=post_comment_form.content.data)
                question.answer_nums += 1
                await self.application.objects.update(question)

                re_data["id"] = answer.id
                re_data["user"] = {
                    "nick_name": self.current_user.nick_name,
                    "id": self.current_user.id
                }
            except QuestionModel.DoesNotExist as e:
                self.set_status(404)
        else:
            self.set_status(400)
            for field in post_comment_form.errors:
                re_data[field] = post_comment_form.errors[field][0]

        self.finish(re_data)
