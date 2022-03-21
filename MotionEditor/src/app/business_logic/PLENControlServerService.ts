enum SERVER_STATE {
    DISCONNECTED,
    CONNECTED,
    WAITING
};

import { ThreeModel } from "../business_logic/ThreeModel";

import { Gscope } from './Gscope';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
    providedIn: 'root',
})
export class PLENControlServerService {
    private _state: SERVER_STATE = SERVER_STATE.DISCONNECTED;
    private _ip_addr: string;
    private _socket: WebSocket;

    static $inject = [
        '$q',
        '$http',
        '$modal',
        '$rootScope',
        'SharedThreeService'
    ];

    constructor(
        public scope: Gscope,
        // private _$q: ng.IQService,
        // private _$http: ng.IHttpService,
        // private _$modal: angular.ui.bootstrap.IModalService,
        // private _$rootScope: ng.IRootScopeService,
        private _three: ThreeModel
    ) {
        // this._$rootScope.$on("SyncBegin", () => { this.onSyncBegin(); });
        // this._$rootScope.$on("SyncEnd", () => { this.onSyncEnd(); });

        // this._$rootScope.$on("3DModelReset", () =>
        // {
        //     if (!_.isNull(this._socket))
        //     {
        //         _.each(this._three.rotation_axes, (axis: THREE.Object3D, index: number) =>
        //         {
        //             this._socket.send('applyDiff/' + axis.name + '/0');
        //         });
        //     }
        // });

        // this._$rootScope.$on("FrameLoadFinished", () =>
        // {
        //     if (!_.isNull(this._socket))
        //     {
        //         _.each(this._three.rotation_axes, (axis: THREE.Object3D, index: number) =>
        //         {
        //             this._socket.send('applyDiff/' + axis.name + '/' + this._three.getDiffAngle(axis, index).toString());
        //         });
        //     }
        // });

        var url = `${location.protocol}//${location.host}`;
        url = `ws${url.substr(4)}/api/websocket`;
        console.log(url);

        const handleOpen = async (event: MessageEventInit) => {
            console.log("connected");
            this._socket.send('{"action":"query"}');
        };
        const handleMessage = async (event: MessageEvent) => {
            const message = JSON.parse(event.data);
            if (message["action"] == "RobotDisConnect")
                scope.RobotDisConnected.next(0);
            else if (message["action"] == "RobotConnect")
                scope.RobotConnected.next(0);
            else if (message["action"] == "load")
                scope.ReadLoadData.next([message["channel"], message["angle"]]);
            else
                console.log(message);
        };
        const closeMessage = () => {
            console.log("closeMessage");
        };

        this._socket = new WebSocket(url) as WebSocket;
        this._socket.addEventListener("message", handleMessage);
        this._socket.addEventListener("open", handleOpen);
        this._socket.addEventListener("close", closeMessage);
        this._socket.addEventListener("error", closeMessage);
    }

    sendmsg(dt): void {
        this._socket.send(JSON.stringify(dt));
    }

    sendAngle(name, angle): void {
        this._socket.send('{"action":"move","name":"' + name + '","angle":"' + angle + '"}');
    }

    addStep(channel, angle): void {
        this.sendmsg({ "action": "set", "angle": angle, "channel": channel });
    }

    saveAngle(channel, angle): void {
        this.sendmsg({ "action": "save", "angle": angle, "channel": channel });
    }

    load0(channel): void {
        this.sendmsg({ "action": "load", "channel": channel, "angle": -1 });
    }

    Run(filename): void {
        this.sendmsg({ "action": "runAction", "filename": filename });
    }

    StopAction(): void {
        this.sendmsg({ "action": "StopAction" });
    }

    Stand(): void {
        this.sendmsg({ "action": "Reset" });
    }

    writeZero(): void {
        this.sendmsg({ "action": "writeZero" });
    }

    getList(callback): void {
        $.ajax({
            url: "./api/motion_list",
            success: (data) => {
                callback(data);
            },
            error: (error) => {
                alert("Loading a 3D model failed. (Please refresh this page.)" + error);
            }
        })
    }

    openfile(filename, callback): void {
        $.ajax({
            url: "./api/motiondetail?filename=" + filename,
            success: (data) => {
                callback(data);
            },
            error: (error) => {
                alert("Loading a 3D model failed. (Please refresh this page.)" + error);
            }
        })
    }

    savefile(filename, body, callback): void {
        $.ajax({
            type: "post",
            url: "./api/savemotiondetail?filename=" + filename,
            data: body,
            success: (data) => {
                callback(data);
            },
            error: (error) => {
                alert("save model error" + JSON.stringify(error));
            }
        })
    }


    checkServerVersion(): void {
        // this._$http.get("//" + this._ip_addr + "/connect")
        //     .success(() =>
        //     {
        //         alert("Your control-server's version is old. Please use latest version.");
        //     })
        //     .error(() =>
        //     {
        //         alert("The control-server hasn't run.");
        //     });
    }

    connect(success_callback = null): void {
        // if (this._state === SERVER_STATE.DISCONNECTED)
        // {
        //     var modal = this._$modal.open({
        //         controller: PLENControlServerModalController,
        //         controllerAs: "$ctrl",
        //         templateUrl: "./angularjs/components/PLENControlServerModal/view.html"
        //     });

        //     modal.result.then((ip_addr: string) =>
        //     {
        //         this._state = SERVER_STATE.WAITING;
        //         this._ip_addr = ip_addr;

        //         this._$http.get("//" + this._ip_addr + "/v2/connect")
        //             .success((response: any) =>
        //             {
        //                 if (response.data.result === true)
        //                 {
        //                     this._state = SERVER_STATE.CONNECTED;

        //                     if (!_.isNull(success_callback))
        //                     {
        //                         success_callback();
        //                     }
        //                 }
        //                 else
        //                 {
        //                     this._state = SERVER_STATE.DISCONNECTED;

        //                     alert("USB connection was disconnected!");

        //                     this._$rootScope.$broadcast("SyncEnd");
        //                 }
        //             })
        //             .error(() =>
        //             {
        //                 this._state = SERVER_STATE.DISCONNECTED;

        //                 this.checkServerVersion();
        //             });
        //     });
        // }
    }

    disconnect(success_callback = null): void {
        // if (this._state === SERVER_STATE.CONNECTED)
        // {
        //     this._state = SERVER_STATE.WAITING;

        //     this._$http.get("//" + this._ip_addr + "/v2/disconnect")
        //         .success((response: any) =>
        //         {
        //             if (response.data.result === true)
        //             {
        //                 if (!_.isNull(success_callback))
        //                 {
        //                     success_callback();
        //                 }
        //             }

        //             this._state = SERVER_STATE.DISCONNECTED;
        //             this._$rootScope.$broadcast("SyncEnd");
        //         })
        //         .error(() =>
        //         {
        //             this._state = SERVER_STATE.CONNECTED;
        //         });
        // }
    }

    install(json, success_callback = null): void {
        // if (this._state === SERVER_STATE.CONNECTED)
        // {
        //     this._state = SERVER_STATE.WAITING;

        //     this._$http.put("//" + this._ip_addr + "/v2/motions/" + json.slot.toString(), json)
        //         .success((response: any) =>
        //         {
        //             this._state = SERVER_STATE.CONNECTED;

        //             if (response.data.result === true)
        //             {
        //                 if (!_.isNull(success_callback))
        //                 {
        //                     success_callback();
        //                 }
        //             }
        //             else
        //             {
        //                 this._state = SERVER_STATE.DISCONNECTED;

        //                 alert("USB connection was disconnected!");

        //                 this._$rootScope.$broadcast("SyncEnd");
        //             }
        //         })
        //         .error(() =>
        //         {
        //             this._state = SERVER_STATE.DISCONNECTED;
        //         })
        //         .finally(() =>
        //         {
        //             this._$rootScope.$broadcast("InstallFinished");
        //         });
        // }
    }

    play(slot: number, success_callback = null): void {
        // if (this._state === SERVER_STATE.CONNECTED)
        // {
        //     this._state = SERVER_STATE.WAITING;

        //     this._$http.get("//" + this._ip_addr + "/v2/motions/" + slot.toString() + "/play")
        //         .success((response: any) =>
        //         {
        //             this._state = SERVER_STATE.CONNECTED;

        //             if (response.data.result === true)
        //             {
        //                 if (!_.isNull(success_callback))
        //                 {
        //                     success_callback();
        //                 }
        //             }
        //             else
        //             {
        //                 this._state = SERVER_STATE.DISCONNECTED;

        //                 alert("USB connection was disconnected!");

        //                 this._$rootScope.$broadcast("SyncEnd");
        //             }
        //         })
        //         .error(() =>
        //         {
        //             this._state = SERVER_STATE.DISCONNECTED;
        //         });
        // }
    }

    stop(success_callback = null): void {
        // if (this._state === SERVER_STATE.CONNECTED)
        // {
        //     this._state = SERVER_STATE.WAITING;

        //     this._$http.get("//" + this._ip_addr + "/v2/motions/stop")
        //         .success((response: any) =>
        //         {
        //             this._state = SERVER_STATE.CONNECTED;

        //             if (response.data.result === true)
        //             {
        //                 if (!_.isNull(success_callback))
        //                 {
        //                     success_callback();
        //                 }
        //             }
        //             else
        //             {
        //                 this._state = SERVER_STATE.DISCONNECTED;

        //                 alert("USB connection was disconnected!");

        //                 this._$rootScope.$broadcast("SyncEnd");
        //             }
        //         })
        //         .error(() =>
        //         {
        //             this._state = SERVER_STATE.DISCONNECTED;
        //         });
        // }
    }

    getStatus(): SERVER_STATE {
        return this._state;
    }

    asyncCheckVersionOfPLEN(): void//ng.IPromise<any>
    {
        // var url_promises: Array<ng.IPromise<any>> = _.map(
        // [
        //     '//' + this._ip_addr + '/v2/version',
        //     '//' + this._ip_addr + '/v2/metadata'
        // ],
        // (url) =>
        // {
        //     return this._$http.get(url).then((r) => { return r.data; });
        // });

        // return this._$q.all(url_promises)
        //     .then((responses) =>
        //     {
        //         try {
        //             var firmware_version: number = parseInt(responses[0].data['version'].replace(/\./g, ''));
        //             var required_verison: number = parseInt(responses[1].data['required-firmware'].replace(/[\.\~]/g, ''));

        //             if (firmware_version < required_verison) throw ('Firmware version of your PLEN is old. Please update version ' + responses[1].data['required-firmware'] + '.');
        //             if (required_verison < 141)              throw ('Application version of "Control Server" is old. Please update version 2.3.1 or above.');
        //         }
        //         catch (error)
        //         {
        //             return this._$q.reject(error);
        //         }
        //     })
        //     .catch((error: any) =>
        //     {
        //         this.disconnect();

        //         alert(_.isString(error)? error : 'Application version of "Control Server" is old. Please update version 2.3.1 or above.');
        //     });
    }

    onSyncBegin(): void {
        // if (!_.isNull(this._socket))
        // {
        //     this._socket.close();
        //     this._socket = null;
        // }

        // this._socket = new WebSocket('ws://' + this._ip_addr + '/v2/cmdstream');

        // this._socket.onopen = () =>
        // {
        //     if (this._socket.readyState === WebSocket.OPEN)
        //     {
        //         this._state = SERVER_STATE.CONNECTED;

        //         $("html").on("angleChange.toPLENControlServerService", () =>
        //         {
        //             if (this._state === SERVER_STATE.CONNECTED)
        //             {
        //                 var device: string = this._three.transform_controls.object.name;
        //                 var value: number = this._three.getDiffAngle(this._three.transform_controls.object);

        //                 this._socket.send('applyDiff/' + device + '/' + value.toString());
        //                 this._state = SERVER_STATE.WAITING;
        //             }
        //         });
        //     }
        // };

        // this._socket.onmessage = (e: MessageEvent) =>
        // {
        //     if (e.data == 'False')
        //     {
        //         if (this._state === SERVER_STATE.WAITING)
        //         {
        //             this._state = SERVER_STATE.DISCONNECTED;

        //             alert("USB connection was disconnected!");

        //             this._$rootScope.$broadcast("SyncEnd");
        //         }
        //     }
        //     else
        //     {
        //         this._state = SERVER_STATE.CONNECTED;
        //     }
        // };

        // this._socket.onerror = () =>
        // {
        //     this._state = SERVER_STATE.DISCONNECTED;

        //     alert("USB connection was disconnected!");

        //     this._$rootScope.$broadcast("SyncEnd");
        // };
    }

    onSyncEnd(): void {
        // this._socket.close();
        // this._socket = null;

        // $("html").off("angleChange.toPLENControlServerService");
    }
}

// angular.module(APP_NAME).service("PLENControlServerService", PLENControlServerService);