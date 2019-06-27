# -*- coding: utf-8 -*-
from tornado.web import url


from apps.question.handler import *


urlpatterns = (
    url("/questions/", QuestionHandler),
    url("/questions/([0-9])/", QuestionDetailHandler),

    # 问题回答
    url("/questions/([0-9])/answers/", AnswerHandler),
)
