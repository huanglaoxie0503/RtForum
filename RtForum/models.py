# -*- coding: utf-8 -*-
from datetime import datetime

from peewee import *
from RtForum.settings import DataBase


class BaseModel(Model):
    add_time = DateTimeField(default=datetime.now, verbose_name="添加时间")

    class Meta:
        database = DataBase
