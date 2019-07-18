# -*- coding: utf-8 -*-
import os
import peewee_async

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

Settings = {
    "static_path": "D:/work/RtForum/static",
    "static_url_prefix": "/static/",
    "templates": "templates",
    "jwt_expire": 7 * 24 * 3600,
    "db": {
        "host": "127.0.0.1",
        "user": "root",
        "password": "root",
        "name": "rt_forum",
        "port": "3306"
    },
    "redis": {
        "host": "127.0.0.1",

    },
    "secret_key": "E1hUMCqdqaTY3kQC",
    "MEDIA_ROOT": os.path.join(BASE_DIR, "media"),
    "SITE_URL": "http://127.0.0.1:8888",
}
MOBILE_REGEX = r"^1[358]\d{9}$|^1[48]7\d{8}$|^176\d{8}$"
ApiKey = "xxx"
DataBase = peewee_async.MySQLDatabase("rt_forum", host="127.0.0.1", user="root", password="root", port=3306)
