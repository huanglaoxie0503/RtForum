# -*- coding: utf-8 -*-
import peewee_async


Settings = {
    "static_path": "D:/work/RtForum/static",
    "static_url_prefix": "/static/",
    "templates": "templates",
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
    "secret_key": "E1hUMCqdqaTY3kQC"
}
MOBILE_REGEX = "^1[358]\d{9}$|^1[48]7\d{8}$|^176\d{8}$"
ApiKey = "58fe76d63533aaea39eed8deddff81e2"
DataBase = peewee_async.MySQLDatabase("rt_forum", host="127.0.0.1", user="root", password="root", port=3306)

