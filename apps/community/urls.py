# -*- coding: utf-8 -*-
from tornado.web import url

from apps.community.handler import CommunityGroupHandler, GroupMemberHandler, GroupDetailHandler, PostHandler


urlpatterns = (
    url("/groups/", CommunityGroupHandler),
    url("/groups/([0-9]+)/", GroupDetailHandler),
    url("/groups/([0-9]+)/members", GroupMemberHandler),
    url("/groups/([0-9]+)/posts", PostHandler),
)

