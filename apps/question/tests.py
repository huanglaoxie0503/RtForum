# -*- coding: utf-8 -*-
import requests
import json
from datetime import datetime
import jwt

from RtForum.settings import Settings

current_time = datetime.utcnow()
web_site_url = "http://127.0.0.1:8888"
jwt_data = jwt.encode({
    "name": "袁承志",
    "id": 1,
    "exp": current_time
}, Settings["secret_key"]).decode("utf8")
headers = {"tsessionid": jwt_data}


def new_question():
    files = {
        "image": open("D:/work/RtForum/static/images/yyb.png", "rb")
    }
    data = {
        "title": "北向资金净流入38.39亿元",
        "content": "证券时报e公司讯，6月27日，截至A股收盘，统计数据显示北向资金合计净流入38.39亿元。其中沪股通净流入9.34亿元，深股通净流入29.05亿元。",
        "category": "技术分享"
    }
    res = requests.post("{}/questions/".format(web_site_url), headers=headers, data=data, files=files)
    print(res.status_code)
    print(json.loads(res.text))


def get_question_list():
    res = requests.get("{}/questions/".format(web_site_url), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


def get_question_detail(question_id):
    res = requests.get("{}/questions/{}/".format(web_site_url, question_id), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


def add_answer(question_id):
    # 获取发帖
    data = {
        "content": "商务部：美听证会96%代表反对对中国商品加征关税??????"
    }
    res = requests.post("{}/questions/{}/answers/".format(web_site_url, question_id), headers=headers, json=data)
    print(res.status_code)
    print(json.loads(res.text))


def get_answer(question_id):
    # 获取发帖
    res = requests.post("{}/questions/{}/answers/".format(web_site_url, question_id), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


if __name__ == '__main__':
    # new_question()
    # get_question_list()
    # get_question_detail(1)
    add_answer(1)
    get_answer(1)

