#!/usr/bin/env python
# encoding: utf-8
from .handlers import *
from tornado.web import url

urlpatterns = (
    (r'/upload/', UploadHandler),
    (r'/ueditor', UeditorHandler),
    (r'/upload/(.*)', StaticFileHandler, {'path': 'upload'}),
)
