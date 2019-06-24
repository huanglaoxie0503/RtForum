# -*- coding: utf-8 -*-
from tornado.web import url

from apps.users.handler import SmsHandler, RegisterHandler, LoginHandler


urlpatterns = (
    url("/code/", SmsHandler),
    url("/register/", RegisterHandler),
    url("/login/", LoginHandler),
)
