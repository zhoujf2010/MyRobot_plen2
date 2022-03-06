
import imp
from typing import ChainMap
import websocket
import json
import time
import base64
import sys
import os
import psutil
import socket
import logging
import threading
import asyncio
from webFrame.webapp import webapp
from webFrame.eventBus import EventBus
from webFrame.websocketView import WebsocketAPIView
import timer

_logger = logging.getLogger(__name__)

# 关节名称
devices = {}
devices["left_shoulder_pitch"] = 1
devices["left_shoulder_roll"] = 3
devices["left_elbow_roll"] = 4
devices["left_thigh_yaw"] = 2
devices["left_thigh_roll"] = 5
devices["left_thigh_pitch"] = 6
devices["left_knee_pitch"] = 7
devices["left_foot_pitch"] = 8
devices["left_foot_roll"] = 9

devices["right_shoulder_pitch"] = 10
devices["right_shoulder_roll"] = 12
devices["right_elbow_roll"] = 13
devices["right_thigh_yaw"] = 11
devices["right_thigh_roll"] = 14
devices["right_thigh_pitch"] = 15
devices["right_knee_pitch"] = 16
devices["right_foot_pitch"] = 17
devices["right_foot_roll"] = 18


class Robot:
    def __init__(self, app) -> None:
        self.app = app
        self.running = True
        self.host_ip = "192.168.3.50"
        self.host_port = 8080
        self.connected = False
        self.recing = False  # 监听线程

        #加载关节初使位置
        f = open(app.rootpath + "../initList.json")
        self.initList = json.load(f)
        f.close()

        threading.Thread(target=self.check).start()

        # 注册总线事件
        app.eventBus.async_listen("PositionChange", self.almond_hass_start)

    def check(self):
        '''
            检测，每两秒检测是否连接着机器人
        '''
        while self.running:
            if not self.connected:
                self.connect()
            else:
                self.send([0, 0])

            time.sleep(2)

    def connect(self):
        '''socket连接'''
        self.sock = socket.socket()
        self.sock.settimeout(5)
        try:
            self.sock.connect((self.host_ip, self.host_port))
            self.sock.settimeout(None)
            self.connected = True

            # 启动监听信息的线程
            self.recing = True
            self.thd = threading.Thread(target=self._receive)
            self.thd.start()

            self.app.eventBus.async_fire("RobotConnect", None)

            _logger.info("连接到机器人")
        except socket.error as e:
            _logger.error("Socket Connect Error:%s" % e)
            self.connected = False

    def send(self, bts):
        try:
            self.sock.send(bytes(bts))
        except socket.error as e:
            _logger.error("Socket send Error:%s" % e)
            self.connected = False
            self.recing = False
            self.app.eventBus.async_fire("RobotDisConnect", None)

    def _receive(self):
        while self.running and self.recing:
            try:
                data = self.sock.recv(1)
                if len(data) > 0:
                    self.receive(data)
            except socket.error as e:
                _logger.error('socket running error:', str(e))
                self.connected = False
                self.recing = False
                self.app.eventBus.async_fire("RobotDisConnect", None)
                break

    def close(self):
        self.running = False

    def receive(self, data):
        # print('recv:', data)
        pass

    def seg(self, cmd, index, pwd):
        dt = []
        dt.append(cmd)
        dt.append(index)
        if pwd > 0:
            dt.append(0)
        else:
            dt.append(1)
            pwd = -pwd
        dt.append((int)(pwd / 256))
        dt.append(pwd % 256)
        return dt

    def getAngleID(self,name):
        return devices[name]

    def ajastAngle(self,val,minval,maxval):
        delt = maxval - minval
        v = (val - minval)/delt
        v = v * 1600 + (-800)
        return int(v)

    def almond_hass_start(self, eventtype, data):
        '''获取界面信息'''
        if not self.connected:
            return
        _logger.info("action:%s,angle:%s,channel:%s" % (data["action"], data["angle"], data["channel"]))
        angle = data["angle"]
        channel = int(data["channel"])-1
        action = data["action"]
        if action == "set":
            self.send(self.seg(1, channel, int(angle)))
        elif action == "save":
            self.initList[channel] = angle
            self.send(self.seg(2, channel, int(angle)))
            self.app.eventBus.async_fire("savetofile", self.initList)
        elif action == "load":
            dt = 0
            if channel in self.initList:
                dt = self.initList[channel]
            data["socketclient"].send_message({"action": "load", "angle": dt, "channel": channel})


    def reset(self):
        '''立正'''
        _logger.info("action:reset")
        for i in range(18):
            self.send(self.seg(1,i,0))
            time.sleep(0.1)

    def writeZero(self):
        '''写入零位'''
        _logger.info("action:writeZero")
        for k in self.initList.keys():
            self.send(self.seg(2,int(k),int(self.initList[k])))
            time.sleep(0.5)
            print(k)
        
    def runAction(self, filename):
        '''执行某动作文件'''
        if not self.connected:
            _logger.error("机器人未连接")
            return

        _logger.info("action:runAction,filename:%s" % filename)

        f = open(self.app.rootpath + "../motions/%s" % filename)
        dt = json.load(f)
        f.close()

        for frame in dt["frames"]:
            tm = int(frame["transition_time_ms"]) / 1000.0
            for move in frame["outputs"]:
                device = devices[move["device"]]-1
                value = int(move["value"])
                self.send(self.seg(1, device, value))
            time.sleep(tm)
