# -*- coding: utf-8 -*-
from peewee import *

from RtForum.models import BaseModel
from apps.users.models import User


class QuestionModel(BaseModel):
    user = ForeignKeyField(User, verbose_name="用户", related_name="question_author")
    category = CharField(max_length=200, verbose_name="分类", null=True)
    title = CharField(max_length=200, verbose_name="标题", null=True)
    content = TextField(verbose_name="内容")
    image = CharField(default=200, verbose_name="图片")
    answer_nums = IntegerField(default=0, verbose_name="回答数")

    @classmethod
    def extend(cls):
        """
        扩展方法：处理带外键的序列化
        """
        return cls.select(cls, User.id, User.nick_name).join(User)


class AnswerModel(BaseModel):
    """
      回答和回复
    """
    user = ForeignKeyField(User, verbose_name="用户", related_name="answer_author")
    question = CharField(max_length=200, verbose_name="问题")
    parent_answer = ForeignKeyField("self", null=True, verbose_name="回答", related_name="answer_parent")
    reply_user = ForeignKeyField(User, verbose_name="用户", related_name="reply_author_answer")
    content = TextField(verbose_name="内容")
    reply_nums = IntegerField(default=0, verbose_name="回复数")

    @classmethod
    def extend(cls):
        # 1. 多表join
        # 2. 多字段映射同一个model
        author = User.alias()
        reply_user = User.alias()
        return cls.select(cls, QuestionModel, reply_user.id, reply_user.nick_name, author.id, author.nick_name).join(
            QuestionModel, join_type=JOIN.LEFT_OUTER, on=cls.question).switch(cls).join(author,
                                                                                        join_type=JOIN.LEFT_OUTER,
                                                                                        on=cls.user).switch(cls).join(
            reply_user, join_type=JOIN.LEFT_OUTER, on=cls.reply_user
        )
