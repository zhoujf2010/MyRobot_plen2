
from __future__ import annotations
from aiohttp import web
from webFrame.baseview import BaseView, route
from ipaddress import ip_address
from datetime import timedelta
import voluptuous as vol
import webFrame.commontool as tool
import logging
import json
import os


class Motion(BaseView):
    """处理动作相关restful."""
    name = "MotionView"

    def __init__(self, app):
        self.app = app

    @route("/api/motion_list")
    async def getMotionlist(self, request):
        """获取动作列表"""
        lst = os.listdir(self.app.rootpath + "../motions")

        return self.json_result(lst)

    @route("/api/motiondetail")
    async def getmotiondetail(self, request):
        """获取某动作内容"""
        filename = request.query["filename"]
        f = open(self.app.rootpath + "../motions/%s" % filename)
        dt = json.load(f)
        f.close()
        return self.json_result(dt)

    @route("/api/savemotiondetail",methods=["POST"])
    async def postmotiondetail(self, request):
        """获取某动作内容"""
        filename = request.query["filename"]
        data = await request.json()

        with open(self.app.rootpath + '../motions/' + filename, 'w') as fw:
            json.dump(data,fw,indent=4, sort_keys=True)

        return self.json_result({"result":"ok"})
