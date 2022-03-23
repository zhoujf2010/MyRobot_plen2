'''
Created on 2019年3月21日

@author: zjf
'''
from tkinter.messagebox import NO
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
from Robot import Robot
import signal
from motion import Motion


_LOGGER = logging.getLogger(__name__)

_stopped = None
def sigint_handler(a,b):
    _stopped.set()

async def RobotBridge(app):

    def RobotConnect(eventtype,data):
        print("RobotConnect")
        if app.webclient:
            app.webclient.send_message({"action":"RobotConnect"})

    app.eventBus.async_listen("RobotConnect", RobotConnect)
        
    def RobotDisConnect(eventtype,data):
        print("RobotDisConnect")
        if app.webclient:
            app.webclient.send_message({"action":"RobotDisConnect"})
    
    app.eventBus.async_listen("RobotDisConnect", RobotDisConnect)

async def commonHandle(app, socketclient, msg):
    try:
        data = json.loads(msg)
        data["socketclient"] = socketclient
        app.webclient = socketclient

        if "action" in data:
            if data["action"] == "runAction":
                app.robot.runAction(data["filename"])
            elif data["action"] == "Reset":
                app.robot.reset()
            elif data["action"] == "writeZero":
                app.robot.writeZero()
            elif data["action"] == "move": #接收到单部件移动指令
                id = app.robot.getAngleID(data["name"])
                angle = int(data["angle"])
                v = app.robot.ajastAngle(angle,-1800,1800)
                app.robot.almond_hass_start("",{"action":"set","angle":v,"channel":id})
            elif data["action"] == "query":
                if app.robot.connected:
                    app.webclient.send_message({"action":"RobotConnect"})
                else:
                    app.webclient.send_message({"action":"RobotDisConnect"})
            else:
                #app.eventBus.async_fire("PositionChange",data)
                app.robot.almond_hass_start("",data)
    except:
        return

async def main():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    _LOGGER.info("启动服务，当前路径：" + dir_path)
    rootpath = dir_path + "/webpage/"

    app = webapp(8082)
    app.rootpath = rootpath
    app.eventBus = EventBus()
    app.webclient = None

    await RobotBridge(app)
    app.robot = Robot(app)

    app.register_view(Motion(app))
    app.register_view(WebsocketAPIView(app, commonHandle))
    # 注册静态资源
    for path in ["js", "css", "img", "static","angularjs","Scripts","lib","assets"]:
        app.register_static_path(f"/{path}", rootpath + "/" + path)
    
    for f in os.listdir(rootpath): 
        if f.endswith(".css") or f.endswith(".js"):
            app.register_static_path(f"/{f}", rootpath + "/" + f)

    app.register_static_path("/", rootpath + "/" + "index.html")

    await app.start()

    global _stopped
    _stopped = asyncio.Event()
    await _stopped.wait()

    print("start end")
    await app.stop()
    app.robot.close()
    print("end")

if __name__ == '__main__':
    signal.signal(signal.SIGINT, sigint_handler)

    logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    asyncio.run(main())