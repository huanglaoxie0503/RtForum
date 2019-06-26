# -*- coding: utf-8 -*-
import uuid
import os
import json

import aiofiles
from playhouse.shortcuts import model_to_dict

from RtForum.handler import RedisHandler
from apps.utils.rtform_decorators import authenticated_async
from apps.utils.util_func import json_serializer
from apps.community.forms import *
from apps.community.models import *


class GroupDetailHandler(RedisHandler):
    @authenticated_async
    async def get(self, group_id, *args, **kwargs):
        # 获取小组基本信息
        re_data = {}
        try:
            group = await self.application.objects.get(CommunityGroup, id=int(group_id))
            item_dict = {}
            item_dict["name"] = group.name
            item_dict["id"] = group.id
            item_dict["desc"] = group.desc
            item_dict["notice"] = group.notice
            item_dict["member_nums"] = group.member_nums
            item_dict["post_nums"] = group.post_nums
            item_dict["front_image"] = "{}/media/{}/".format(self.settings["SITE_URL"], group.front_image)
            re_data = item_dict
        except CommunityGroup.DoesNotExist as e:
            self.set_status(404)

        self.finish(re_data)


class GroupMemberHandler(RedisHandler):
    @authenticated_async
    async def post(self, group_id, *args, **kwargs):
        # 申请加入小组
        re_data = {}
        param = self.request.body.decode("utf8")
        param = json.loads(param)
        apply_group_form = GroupApplyForm.from_json(param)
        if apply_group_form.validate():
            try:
                group = await self.application.objects.get(CommunityGroup, id=int(group_id))

                existed = await self.application.objects.get(CommunityGroupMember, community=group,
                                                             user=self.current_user)
                self.set_status(400)
                re_data["non_fields"] = "用户已经加入"
            except CommunityGroup.DoesNotExist as e:
                self.set_status(404)
            except CommunityGroupMember.DoesNotExist as e:
                community_member = await self.application.objects.create(CommunityGroupMember, community=group,
                                                                         user=self.current_user,
                                                                         apply_reason=apply_group_form.apply_reason.data)
                re_data['id'] = community_member.id
        else:
            self.set_status(400)
            for field in apply_group_form.errors:
                re_data[field] = apply_group_form.errors[0]

        self.finish(re_data)


class CommunityGroupHandler(RedisHandler):
    async def get(self, *args, **kwargs):
        # 获取小组列表
        re_data = []
        community_query = CommunityGroup.extend()
        # 根据类别进行过滤
        c = self.get_argument("c", None)
        if c:
            community_query = community_query.filter(CommunityGroup.category == c)
        # 根据参数进行排序
        order = self.get_argument("o", None)
        if order:
            if order == "new":
                community_query = community_query.order_by(CommunityGroup.add_time.desc())
            elif order == "hot":
                community_query = community_query.order_by(CommunityGroup.member_nums.desc())
        limit = self.get_argument("limit", None)
        if limit:
            community_query = community_query.limit(int(limit))

        groups = await self.application.objects.execute(community_query)
        for group in groups:
            group_dict = model_to_dict(group)
            group_dict["front_image"] = "{}/media/{}/".format(self.settings["SITE_URL"], group_dict["front_image"])
            re_data.append(group_dict)

        self.finish(json.dumps(re_data, default=json_serializer))

    @authenticated_async
    async def post(self, *args, **kwargs):
        re_data = {}

        # 不能使用json_form
        group_form = CommunityGroupForm(self.request.body_arguments)
        if group_form.validate():
            # 自己完成图片字段验证
            files_meta = self.request.files.get("front_image", None)
            if not files_meta:
                self.set_status(400)
                re_data["front_image"] = "请上传图片"
            else:
                # 完成图片保存(异步)并设置给对应的记录, 通过aiofiles 完成文件读写
                # 1.生成文件名
                new_filename = ""
                for meta in files_meta:
                    filename = meta["filename"]
                    new_filename = "{uuid}_{filename}".format(uuid=uuid.uuid1(), filename=filename)
                    file_path = os.path.join(self.settings["MEDIA_ROOT"], new_filename)
                    async with aiofiles.open(file_path, 'wb') as f:
                        await f.write(meta["body"])

                group = await self.application.objects.create(CommunityGroup, add_user=self.current_user,
                                                              name=group_form.name.data,
                                                              category=group_form.category.data,
                                                              desc=group_form.desc.data, notice=group_form.notice.data,
                                                              front_image=new_filename)
                re_data["id"] = group.id
        else:
            self.set_status(400)
            for field in group_form.errors:
                re_data[field] = group_form.errors[field][0]

        self.finish(re_data)


class PostHandler(RedisHandler):
    @authenticated_async
    async def get(self, group_id, *args, **kwargs):
        # 获取小组帖子
        post_list = []
        Flag = True
        try:
            group = await self.application.objects.get(CommunityGroup, id=int(group_id))

            group_member = await self.application.objects.get(CommunityGroupMember, user=self.current_user,
                                                              community=group, status="agree")
            post_query = Post.extend()
            # 根据类别进行过滤
            c = self.get_argument("c", None)
            if c == "hot":
                post_query = post_query.filter(Post.is_hot == Flag)
            if c == "excellent":
                post_query = post_query.filter(Post.is_excellent == Flag)
            posts = await self.application.objects.execute(Post)
            for post in posts:
                item_dict = {
                    "user": {
                        "id": post.uesr.id,
                        "nick_name": post.user.nick_name
                    },
                    "id": post.id,
                    "title": post.title,
                    "content": post.content,
                    "comment_nums": post.comment_nums
                }
                post_list.append(item_dict)
        except CommunityGroupMember.DoesNotExist as e:
            self.set_status(403)
        except CommunityGroup.DoesNotExist as e:
            self.set_status(404)

        self.finish(json.dumps(post_list))

    @authenticated_async
    async def post(self, group_id, *args, **kwargs):
        # 小组内发帖
        re_data = {}
        try:
            group = await self.application.objects.get(CommunityGroup, id=int(group_id))

            group_member = await self.application.objects.get(CommunityGroupMember, user=self.current_user,
                                                              community=group, status="agree")
            param = self.request.body.decode("utf8")
            param = json.loads(param)
            post_form = PostForm.from_json(param)
            if post_form.validate():
                post = await self.application.objects.create(Post, user=self.current_user, title=post_form.title.data,
                                                             content=post_form.content.data, group=group)
                re_data["id"] = post.id
            else:
                self.set_status(400)
                for field in post_form.errors:
                    re_data[field] = post_form.errors[field][0]
        except CommunityGroup.DoesNotExist as e:
            self.set_status(404)
        except CommunityGroupMember.DoesNotExist as e:
            self.set_status(403)

        self.finish(re_data)


class PostDetailHandler(RedisHandler):
    @authenticated_async
    async def get(self, post_id, *args, **kwargs):
        # 获取某一帖子详情
        re_data = {}
        post_detail = await self.application.objects.execute(Post.extend().where(Post.id == int(post_id)))
        re_count = 0
        for data in post_detail:
            item_dict = {}
            item_dict["user"] = model_to_dict(data.user)
            item_dict["title"] = data.title
            item_dict["content"] = data.content
            item_dict["comment_nums"] = data.comment_nums
            item_dict["add_time"] = data.add_time.strftime("%Y-%m-%d")
            re_data = item_dict

            re_count += 1
        if re_count == 0:
            self.set_status(404)

        self.finish(re_data)


class PostCommentHandler(RedisHandler):
    @authenticated_async
    async def post(self, post_id, *args, **kwargs):
        # 新增评论
        re_data = {}
        param = self.request.body.decode("utf8")
        param = json.loads(param)
        post_comment_form = PostCommentForm.from_json(param)
        if post_comment_form.validate():
            try:
                post = await self.application.objects.get(Post, id=int(post_id))
                post_comment = await self.application.objects.create(PostComment, user=self.current_user, post=post,
                                                                     content=post_comment_form.content.data)
                re_data["id"] = post_comment.id
                re_data["user"] = {}
                re_data["user"]["nick_name"] = self.current_user.nick_name
                re_data["user"]["id"] = self.current_user.id
            except Post.DoesNotExist as e:
                self.set_status(404)
        else:
            self.set_status(400)
            for field in post_comment_form.errors:
                re_data[field] = post_comment_form.errors[field][0]

        self.finish(re_data)

