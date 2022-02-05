'''
Created on 2019年3月21日

@author: zjf
'''
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


_LOGGER = logging.getLogger(__name__)


class SockClient(threading.Thread):

    def __init__(self,msgcallback, host_ip, host_port):
        threading.Thread.__init__(self)
        self.running = False
        self.msgcallback = msgcallback
        self.sock = socket.socket()
        self.sock.settimeout(20)  # 20 seconds
        try:
            self.sock.connect((host_ip, host_port))
            self.sock.settimeout(None)
        except socket.error as e:
            print("Socket Connect Error:%s" % e)
            exit(1)
        self.running = True

        self.error_cnt = 0

    def close(self):
        self.sock.close()

    def run(self):
        while self.running:
            try:
                data = self.sock.recv(1)
                if len(data) > 0:
                    self.error_cnt = 0
                    #recv_data = data.encode('hex')
                    #print('recv:', data)
                    dt ={"method":"hcval","params":{"message":data[0]}}
                    self.msgcallback(dt)
            except socket.error as e:
                print('socket running error:', str(e))
                break

        print('SockClient Thread Exit\n')

    
    def sendcmd(self, cmd):
        self.sock.send(cmd.encode())

    def sendbts(self, cmd):
        self.sock.send(cmd)

    def sendmethod(self,method, param):
        dt = json.loads(param)
        data = int(dt["msg"])
        # print(data)
        my_bytes = bytearray()
        my_bytes.append(data)

        self.sock.send(my_bytes)


def seg(cmd,index,pwd):
    dt = []
    dt.append(cmd)
    dt.append(index)
    if pwd >0:
        dt.append(0)
    else:
        dt.append(1)
        pwd = -pwd
    dt.append((int)(pwd / 256))
    dt.append(pwd % 256)
    return bytes(dt)



async def Robot(app):
    s = SockClient(None,"192.168.3.50",8080)
    
    def almond_hass_start(eventtype,data):
        print("orgmsg=========>",data)
        angle = data["angle"]
        channel = int(data["channel"])-1
        action =data["action"]
        if action =="set":
            s.sendbts(seg(1,channel,int(angle)))
        elif action =="save":
            app.initList[channel] = angle
            s.sendbts(seg(2,channel,int(angle)))
            app.eventBus.async_fire("savetofile",app.initList)
        elif action == "load":
            dt = 0
            if channel in app.initList :
                dt = app.initList[channel]
            data["socketclient"].send_message({"action":"load","angle":dt,"channel":channel})

    app.eventBus.async_listen("PositionChange", almond_hass_start)
    
    def savetofile(eventtype,data):
        with open('initList.json', 'w') as fw:
            json.dump(data,fw)

    app.eventBus.async_listen("savetofile", savetofile)



async def main():
    dir_path = os.path.dirname(os.path.realpath(__file__))
    _LOGGER.info("启动服务，当前路径：" + dir_path)
    rootpath = dir_path + "/webpage/"

    app = webapp(8082)
    app.eventBus = EventBus()
    app.initList = {}
    
    if os.path.exists('initList.json'):
        with open('initList.json','r') as f:
            app.initList = json.load(f)

    # await RegiestPCA9685(app)
    await Robot(app)

    async def commonHandle(app, socketclient, msg):
        try:
            data = json.loads(msg)
            data["socketclient"] = socketclient
            app.eventBus.async_fire("PositionChange",data)
        except:
            return

    app.register_view(WebsocketAPIView(app, commonHandle))
    # 注册静态资源
    for path in ["js", "css", "img", "static","angularjs","Scripts","lib","assets"]:
        app.register_static_path(f"/{path}", rootpath + "/" + path)
    
    for f in os.listdir(rootpath): 
        if f.endswith(".css") or f.endswith(".js"):
            app.register_static_path(f"/{f}", rootpath + "/" + f)

    app.register_static_path("/config", rootpath + "/assets/config.html")
    app.register_static_path("/", rootpath + "/" + "index.html")

    await app.start()

    global _stopped
    _stopped = asyncio.Event()
    await _stopped.wait()
    await app.stop()


def Reset():

    s = SockClient(None,"192.168.3.50",8080)

    for i in range(18):
        s.sendbts(seg(1,i,0))
        print("send:",i)
        time.sleep(0.1)


    # while(True):
    #     s.sendbts(seg(1,5,-90))

    #     time.sleep(2)
    #     s.sendbts(seg(1,5,90))
    #     time.sleep(2)
    s.close()

devices = {}
devices["left_shoulder_pitch"] = 1
devices["left_shoulder_roll"] = 3
devices["left_elbow_roll"] = 4
devices["left_thigh_yaw"] = 2
devices["left_thigh_roll"] = 5
devices["left_thigh_pitch"] =6
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


def walk():
    f = open("./motions/46_Walk_Forward.json")
    dt = json.load(f)
    f.close()

    
    s = SockClient(None,"192.168.3.50",8080)

    for frame in dt["frames"]:
        tm = int(frame["transition_time_ms"]) / 1000.0
        for move in frame["outputs"]:
            device = devices[move["device"]]-1
            value = int(move["value"])
            s.sendbts(seg(1,device,value))
        time.sleep(tm)
    s.close()

def initZero():
    f = open("initList.json")
    dt = json.load(f)
    f.close()
    os.remove("initList.json")
    with open('initList.json', 'w') as fw:
        json.dump(dt,fw)
    s = SockClient(None,"192.168.3.50",8080)
    for k in dt.keys():
        s.sendbts(seg(2,int(k),int(dt[k])))
        time.sleep(0.5)
        print(k)
    s.close()



if __name__ == '__main__':
    # s = SockClient(None,"192.168.3.50",8080)
    # for i in range(0,18):
    #     s.sendbts(seg(2,i+1,0))
    #     time.sleep(0.5)
    # s.close()

    # s.sendbts(seg(1,3,int(300)))
    # time.sleep(3)
    # s.sendbts(seg(1,3,int(100)))
    
    # logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
    # asyncio.run(main())

    walk()
    # initZero()