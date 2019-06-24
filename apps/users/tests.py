# -*- coding: utf-8 -*-
import requests
import json


web_url = "http://127.0.0.1:8888"


def test_sms():
    url = "{}/code/".format(web_url)
    data = {
        "mobile": "15842438946"
    }
    res = requests.post(url, json=data)
    print(json.loads(res.text))


def test_register():
    url = "{}/register/".format(web_url)
    data = {
        "mobile": "15842438946",
        "code": "0503",
        "password": "admin123"
    }
    res = requests.post(url, json=data)
    print(json.loads(res.text))


if __name__ == '__main__':
    # test_sms()
    test_register()

