#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado
import tornado.ioloop
import tornado.web
import tornado.options

from tornado import gen
from tornado.concurrent import run_on_executor
from tornado.concurrent import futures
from tornado.web import StaticFileHandler
from tornado.web import RequestHandler

from PIL import Image
import json
import os
import re
import base64
import datetime
import uuid

# /* 前后端通信相关的配置,注释只允许使用多行方式 */

ueditor_config = {
    # /* 上传图片配置项 */
    "imageActionName": "uploadimage",  # /* 执行上传图片的action名称 */
    "imageFieldName": "upfile",  # /* 提交的图片表单名称 */
    "imageMaxSize": 2048000,  # /* 上传大小限制，单位B */
    "imageAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],  # /* 上传图片格式显示 */
    "imageCompressEnable": True,  # /* 是否压缩图片,默认是true */
    "imageCompressBorder": 1600,  # /* 图片压缩最长边限制 */
    "imageInsertAlign": "center",  # /* 插入的图片浮动方式 */
    "imageUrlPrefix": "/upload/image/",  # /* 图片访问路径前缀 */
    "imagePathFormat": "upload/image/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    # /* {filename} 会替换成原文件名,配置这项需要注意中文乱码问题 */
    # /* {rand:6} 会替换成随机数,后面的数字是随机数的位数 */
    # /* {time} 会替换成时间戳 */
    # /* {yyyy} 会替换成四位年份 */
    # /* {yy} 会替换成两位年份 */
    # /* {mm} 会替换成两位月份 */
    # /* {dd} 会替换成两位日期 */
    # /* {hh} 会替换成两位小时 */
    # /* {ii} 会替换成两位分钟 */
    # /* {ss} 会替换成两位秒 */
    # /* 非法字符 \ : * ? " < > | */
    # /* 具请体看线上文档: fex.baidu.com/ueditor/#use-format_upload_filename */

    # /* 涂鸦图片上传配置项 */
    "scrawlActionName": "uploadscrawl",  # /* 执行上传涂鸦的action名称 */
    "scrawlFieldName": "upfile",  # /* 提交的图片表单名称 */
    "scrawlPathFormat": "upload/image/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "scrawlMaxSize": 2048000,  # /* 上传大小限制，单位B */
    "scrawlUrlPrefix": "/upload/image/",  # /* 图片访问路径前缀 */
    "scrawlInsertAlign": "center",

    # /* 截图工具上传 */
    "snapscreenActionName": "uploadimage",  # /* 执行上传截图的action名称 */
    "snapscreenPathFormat": "upload/image/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "snapscreenUrlPrefix": "/upload/image/",  # /* 图片访问路径前缀 */
    "snapscreenInsertAlign": "center",  # /* 插入的图片浮动方式 */

    # /* 抓取远程图片配置 */
    "catcherLocalDomain": ["127.0.0.1", "localhost", "img.baidu.com"],
    "catcherActionName": "catchimage",  # /* 执行抓取远程图片的action名称 */
    "catcherFieldName": "source",  # /* 提交的图片列表表单名称 */
    "catcherPathFormat": "upload/image/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "catcherUrlPrefix": "/upload/image/",  # /* 图片访问路径前缀 */
    "catcherMaxSize": 2048000,  # /* 上传大小限制，单位B */
    "catcherAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],  # /* 抓取图片格式显示 */

    # /* 上传视频配置 */
    "videoActionName": "uploadvideo",  # /* 执行上传视频的action名称 */
    "videoFieldName": "upfile",  # /* 提交的视频表单名称 */
    "videoPathFormat": "upload/video/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "videoUrlPrefix": "/upload/video/",  # /* 视频访问路径前缀 */
    "videoMaxSize": 102400000,  # /* 上传大小限制，单位B，默认100MB */
    "videoAllowFiles": [
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid"],  # /* 上传视频格式显示 */

    # /* 上传文件配置 */
    "fileActionName": "uploadfile",  # /* controller里,执行上传视频的action名称 */
    "fileFieldName": "upfile",  # /* 提交的文件表单名称 */
    "filePathFormat": "upload/file/",  # /* 上传保存路径,可以自定义保存路径和文件名格式 */
    "fileUrlPrefix": "/upload/file/",  # /* 文件访问路径前缀 */
    "fileMaxSize": 51200000,  # /* 上传大小限制，单位B，默认50MB */
    "fileAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ],  # /* 上传文件格式显示 */

    # /* 列出指定目录下的图片 */
    "imageManagerActionName": "listimage",  # /* 执行图片管理的action名称 */
    "imageManagerListPath": "upload/image/",  # /* 指定要列出图片的目录 */
    "imageManagerListSize": 20,  # /* 每次列出文件数量 */
    "imageManagerUrlPrefix": "/upload/image/",  # /* 图片访问路径前缀 */
    "imageManagerInsertAlign": "center",  # /* 插入的图片浮动方式 */
    "imageManagerAllowFiles": [".png", ".jpg", ".jpeg", ".gif", ".bmp"],  # /* 列出的文件类型 */

    # /* 列出指定目录下的文件 */
    "fileManagerActionName": "listfile",  # /* 执行文件管理的action名称 */
    "fileManagerListPath": "upload/file/",  # /* 指定要列出文件的目录 */
    "fileManagerUrlPrefix": "/upload/file/",  # /* 文件访问路径前缀 */
    "fileManagerListSize": 20,  # /* 每次列出文件数量 */
    "fileManagerAllowFiles": [
        ".png", ".jpg", ".jpeg", ".gif", ".bmp",
        ".flv", ".swf", ".mkv", ".avi", ".rm", ".rmvb", ".mpeg", ".mpg",
        ".ogg", ".ogv", ".mov", ".wmv", ".mp4", ".webm", ".mp3", ".wav", ".mid",
        ".rar", ".zip", ".tar", ".gz", ".7z", ".bz2", ".cab", ".iso",
        ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt", ".md", ".xml"
    ]  # /* 列出的文件类型 */
}


class UeditorEnv():
    walkImageCache = []
    walkFileCache = []

    def __init__(self, with_list_cache=False):
        self.config = ueditor_config
        # print(self.config)

        # build file lists as cache
        if with_list_cache:
            self.walkin(self.config['imagePathFormat'], self.walkImageCache)
            self.walkin(self.config['filePathFormat'], self.walkFileCache)
        # print json.dumps(self.config, indent=1)

    # this only for single runtime instance
    # only if you use NAS as the file backend
    # for multi runtime instance please use database for indexing
    # also ,please add your file sync implement

    def walkin(self, base_dir, cache):
        for root, dirs, files in os.walk(base_dir):
            for name in files:
                cache.append({'file': os.path.join(root.replace(base_dir, ''), name)})

    def get_list(self, start=0, count=20, is_image=True):
        ret = []
        if is_image:
            cache = self.walkImageCache
        else:
            cache = self.walkFileCache

        # fill it as possible, if overthe range, simplely go out
        try:
            for index in range(start, start + count):
                ret.append({'url': cache[index]['file']})
        except:
            pass

        return ret

    def append_file(self, filename, is_image=True):
        if is_image:
            cache = self.walkImageCache
        else:
            cache = self.walkFileCache
        cache.append({'file': filename})


u4Ts = UeditorEnv(with_list_cache=True)

from MxForm.handler import BaseHandler
class UploadHandler(BaseHandler):
    executor = futures.ThreadPoolExecutor(100)

    @run_on_executor()
    def save_file(self, fileobj, base_dir, filename=None, user=None, is_image=True):
        if not user:
            user = 'ueditor'

        upload_path = user + '/' + datetime.datetime.utcnow().strftime('%Y%m%d') + '/'

        # 安全过滤
        base_dir = base_dir.replace('../', '')
        base_dir = re.sub(r'^/+', '', base_dir)
        if not os.path.exists(base_dir + upload_path):
            os.makedirs(base_dir + upload_path)

        if not filename:
            uuidhex = uuid.uuid1().hex
            file_ext = os.path.splitext(fileobj['filename'])[1].lower()
            filename = uuidhex + file_ext

        if not os.path.exists(base_dir + upload_path + filename):
            with open(base_dir + upload_path + filename, 'wb') as f:
                f.write(fileobj['body'])
            result = {
                'state': 'SUCCESS',
                'url': upload_path + filename,
                'title': filename,
                'original': fileobj['filename'],
            }
            u4Ts.append_file(upload_path + filename, is_image=is_image)
            return result
            # self.write(result)
            # self.finish()

    @gen.coroutine
    def get(self):
        action = self.get_argument('action')
        if action == 'config':
            self.write(ueditor_config)
            return

        elif action == u4Ts.config['imageManagerActionName']:
            start = int(self.get_argument('start'))
            size = int(self.get_argument('size'))
            urls = u4Ts.get_list(start, size, is_image=True)
            result = {
                'state': 'SUCCESS',
                'list': urls,
                'start': start,
                'total': len(urls)
            }
            # self.write(result)
            # self.finish()
            return result

        elif action == u4Ts.config['fileManagerActionName']:
            start = int(self.get_argument('start'))
            size = int(self.get_argument('size'))
            urls = u4Ts.get_list(start, size, is_image=False)
            result = {
                'state': 'SUCCESS',
                'list': urls,
                'start': start,
                'total': len(urls)
            }
            self.write(result)
            self.finish()
            return

        self.finish()

    @gen.coroutine
    def post(self):
        data = {}
        action = self.get_argument('action')
        if action == u4Ts.config['imageActionName']:
            for keys in self.request.files:
                for fileobj in self.request.files[keys]:
                    data = yield self.save_file(base_dir=u4Ts.config['imagePathFormat'], fileobj=fileobj)

        elif action == u4Ts.config['scrawlActionName']:
            # python2
            # fileobj = {'filename': 'scrawl.png', 'body': base64.decodestring(self.get_argument(u4Ts.config['scrawlFieldName']))}
            # python3
            fileobj = {'filename': 'scrawl.png',
                       'body': base64.decodebytes(self.get_argument(u4Ts.config['scrawlFieldName']).encode('utf-8'))}
            data = yield self.save_file(base_dir=u4Ts.config['scrawlPathFormat'], fileobj=fileobj)

        elif action == u4Ts.config['snapscreenActionName']:
            for keys in self.request.files:
                for fileobj in self.request.files[keys]:
                    data = yield self.save_file(base_dir=u4Ts.config['snapscreenPathFormat'], fileobj=fileobj)

        elif action == u4Ts.config['videoActionName']:
            for keys in self.request.files:
                for fileobj in self.request.files[keys]:
                    data = yield self.save_file(base_dir=u4Ts.config['videoPathFormat'], fileobj=fileobj)

        elif action == u4Ts.config['fileActionName']:
            for keys in self.request.files:
                for fileobj in self.request.files[keys]:
                    data = yield self.save_file(base_dir=u4Ts.config['filePathFormat'], fileobj=fileobj, is_image=False)
        self.set_header("Content-Type", "text/html")
        self.write(json.dumps(data))
        self.finish()
        # self.finish(data)


class UeditorHandler(RequestHandler):

    @gen.coroutine
    def get(self):
        self.render('ueditor.html')

#
# import logging
#
# logging.basicConfig(level=logging.DEBUG)

# settings = {
#     'debug': True,
#     'cookie_secret': 'ab87b92ff33dc95fa9068faee8137f5adaba10042f44235eb4dae0b667d5efcd',
#     # 'xsrf_cookies': True,
#     'login_url': '/login',
#     'static_path': os.path.join(os.path.dirname(__file__), 'static'),
#     'template_path': os.path.join(os.path.dirname(__file__), 'templates'),
# }

# application = tornado.web.Application([
#     (r'/upload', UploadHandler),
#     (r'/ueditor', UeditorHandler),
#     (r'/static/(.*)', StaticFileHandler, {'path': 'static'}),
#     (r'/upload/(.*)', StaticFileHandler, {'path': 'upload'}),
# ], **settings)
#
# if __name__ == '__main__':
#     application.listen(9009)
#     tornado.ioloop.IOLoop.current().start()