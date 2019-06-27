# -*- coding: utf-8 -*-
from wtforms_tornado import Form
from wtforms import StringField, TextAreaField, IntegerField
from wtforms.validators import DataRequired, AnyOf, Length


class QuestionForm(Form):
    category = StringField("分类", validators=[AnyOf(values=["技术问答", "技术分享"])])
    title = StringField("标题", validators=[DataRequired(message="请输入标题")])
    content = TextAreaField("简介", validators=[DataRequired(message="请输入简介")])


class AnswerForm(Form):
    content = StringField("内容", validators=[DataRequired("请输入内容"), Length(min=3, message="内容不能少于3个字符")])

