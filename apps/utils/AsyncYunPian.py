# -*- coding: utf-8 -*-
import json
from functools import partial
from urllib.parse import urlencode

from tornado import httpclient, ioloop
from tornado.httpclient import HTTPRequest

from RtForum.settings import ApiKey

"""云片网协程发送验证码"""


class AsyncVerifyCode(object):
    def __init__(self, api_key):
        self.api_key = api_key

    async def send_single_sms(self, code, mobile):
        http_client = httpclient.AsyncHTTPClient()
        url = "https://sms.yunpian.com/v2/sms/single_send.json"
        text = "【Rt社区】您的验证码是{0}。如非本人操作，请忽略本短线".format(code)
        post_request = HTTPRequest(url=url, method="POST", body=urlencode({
            "apikey": self.api_key,
            "mobile": mobile,
            "text": text
        }))
        response = await http_client.fetch(post_request)
        # print(response.body.decode("utf-8"))
        return json.loads(response.body.decode("utf-8"))


if __name__ == '__main__':
    # ApiKey = "58fe76d63533aaea39eed8deddff81e2"
    io_loop = ioloop.IOLoop.current()

    verify_code = AsyncVerifyCode(ApiKey)

    new_func = partial(verify_code.send_single_sms, "1234", "15842438946")
    # run_sync 方法可以在运行完某个协程之后停止事件循环
    io_loop.run_sync(new_func)
