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


def get_post(group_id):
    # 获取发帖
    res = requests.get("{}/posts/{}/".format(web_site_url, group_id), headers=headers)
    print(res.status_code)
    print(json.loads(res.text))


def add_comment(post_id):
    # 获取发帖
    data = {
        "content": "python datetime模块用 strftime 格式化时间"
    }
    res = requests.post("{}/posts/{}/comments/".format(web_site_url, post_id), headers=headers, json=data)
    print(res.status_code)
    print(json.loads(res.text))


def add_reply(comment_id):
    # 获取发帖
    data = {
        "reply_user": 1,
        "content": "中证网讯（记者 张典阁）26日，Wind数据显示，北向资金全天净流出12.13亿元。其中，沪股通净流出9.61亿元，深股通净流出2.52亿元。本月北向资金累计净流入387.65亿元。"
    }
    res = requests.post("{}/comments/{}/replys/".format(web_site_url, comment_id), headers=headers, json=data)
    print(res.status_code)
    print(json.loads(res.text))


def add_like(comment_id):
    # 点赞
    res = requests.post("{}/comments/{}/likes/".format(web_site_url, comment_id), headers=headers, json={})
    print(res.status_code)
    print(json.loads(res.text))


if __name__ == '__main__':
    # new_group()
    # apply_grop(1, "Tornado Test")
    # get_group(1)
    # add_post(1)
    # get_post(20)
    add_comment(1)
    # add_reply(1)

    # add_like(1)
