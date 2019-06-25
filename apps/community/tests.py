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


def new_group():
    files = {
        "front_image": open("D:/work/RtForum/static/images/yyb.png", "rb")
    }
    data = {
        "name": "Tornado学习交流社区",
        "desc": "Tornado打造高并发后端",
        "notice": "Tornado打造高并发后端",
        "category": "教育同盟"
    }
    res = requests.post("{}/groups/".format(web_site_url), headers=headers, data=data, files=files)
    print(res.status_code)
    print(json.loads(res.text))


def apply_grop(group_id, apply_reason):
    data = {
        "apply_reason": apply_reason
    }
    res = requests.post("{}/groups/{}/members".format(web_site_url, group_id), headers=headers, json=data)
    print(res.status_code)
    print(json.loads(res.text))


def get_group(group_id):
    res = requests.get("{}/groups/{}/".format(web_site_url, group_id), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


def add_post(group_id):
    # 发帖
    data = {
        "title": "tornado 从入门到实战",
        "content": "tornado 打造高并发系统"
    }
    res = requests.post("{}/groups/{}/posts".format(web_site_url, group_id), headers=headers, json=data)
    print(res.status_code)
    print(json.loads(res.text))


if __name__ == '__main__':
    # new_group()
    # apply_grop(1, "Tornado Test")
    # get_group(1)
    add_post(1)
