# -*- coding: utf-8 -*-
import wtforms_json
from tornado import web, ioloop
from peewee_async import Manager

from RtForum.urls import urlpatterns
from RtForum.settings import Settings, DataBase


if __name__ == '__main__':
    # 集成json到wtforms
    wtforms_json.init()

    app = web.Application(urlpatterns, debug=True, **Settings)
    app.listen(8888)

    objects = Manager(DataBase)
    DataBase.set_allow_sync(False)
    app.objects = objects

    ioloop.IOLoop.current().start()
