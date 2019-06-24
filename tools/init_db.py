# -*- coding: utf-8 -*-
from peewee import MySQLDatabase

from apps.users.models import User

from RtForum.settings import DataBase

dataBase = MySQLDatabase("rt_forum", host="127.0.0.1", user="root", password="root", port=3306)


def init():
    """
    生成数据表
    """
    dataBase.create_tables([User])


if __name__ == '__main__':
    init()
