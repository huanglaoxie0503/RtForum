# -*- coding: utf-8 -*-
import requests


"""云片网同步发送验证码"""


class VerifyCode(object):
    def __init__(self, api_key):
        self.api_key = api_key

    def send_single_sms(self, code, mobile):
        """
        发送验证码
        """
        url = "https://sms.yunpian.com/v2/sms/single_send.json"
        code = "【Rt社区】您的验证码是{0}。如非本人操作，请忽略本短线".format(code)
        response = requests.post(url, data={
            "apikey": self.api_key,
            "mobile": mobile,
            "text": code
        })
        return response


if __name__ == '__main__':
    ApiKey = "58fe76d63533aaea39eed8deddff81e2"
    verify_code = VerifyCode(ApiKey)
    res = verify_code.send_single_sms("1234", "15842438946")
    print(res.text)

