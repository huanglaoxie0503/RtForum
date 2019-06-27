# -*- coding: utf-8 -*-
from tornado.web import url
from tornado.web import StaticFileHandler

from apps.users import urls as user_urls
from apps.community import urls as community_urls
from apps.question import urls as question_urls
from apps.ueditor import urls as ueditor_urls
from RtForum.settings import Settings


urlpatterns = [
    (url("/media/(.*)", StaticFileHandler, {"path": Settings["MEDIA_ROOT"]})),
]

urlpatterns += user_urls.urlpatterns
urlpatterns += community_urls.urlpatterns
urlpatterns += ueditor_urls.urlpatterns
urlpatterns += question_urls.urlpatterns

