# -*- coding: utf-8 -*-
from datetime import datetime
from peewee import *

from RtForum.models import BaseModel
from apps.users.models import User


MESSAGE_TYPE = (
    (1, "评论"),
    (2, "帖子回复"),
    (3, "点赞"),
    (4, "回答"),
    (5, "回答的回复"),
)


class MessageModel(BaseModel):
    sender = ForeignKeyField(User, verbose_name="发送者")
    receiver = ForeignKeyField(User, verbose_name="接收者")
    message_type = IntegerField(choices=MESSAGE_TYPE, verbose_name="消息类别")
    message = CharField(max_length=150, null=True, verbose_name="内容")
    parent_content = CharField(max_length=150, null=True, verbose_name="内容")
