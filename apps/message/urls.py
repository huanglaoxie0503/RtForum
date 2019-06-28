# -*- coding: utf-8 -*-
from tornado.web import url

from apps.message.handler import *

urlpatterns = (
    url("/messages/", MessageHandler),
)

