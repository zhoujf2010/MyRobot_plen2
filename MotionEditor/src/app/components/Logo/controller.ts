import { Component, OnInit } from '@angular/core';
import * as angular from "angular";
import {PLENControlServerService} from '../../services/PLENControlServerService';
import {Gscope} from '../../services/Gscope';



@Component({
    selector: 'Logo-button',
    templateUrl: './view.html',
    styleUrls: []
  })

export class LogoController
{
    logurl: string;

    static $inject = ['$window'];
    ttitle = "aaa";
    

    constructor(
        public scope: Gscope,
        public plen_controll_server_service: PLENControlServerService,
        // public $modal: angular.ui.bootstrap.IModalService
    )
    {
        this.logurl = "logo2.png";

        scope.RobotConnected.subscribe((item)=>{this.logurl = "logo.png";});
        scope.RobotDisConnected.subscribe((item)=>{this.logurl = "logo2.png";});
    }

    onClick(): void
    {
        if (this.logurl == "logo2.png")
            {
                alert("未连接机器人");
                return ;
            }
        // window.open(
        //     encodeURI(this.href),
        //     'tweeter_window',
        //     'width=650,height=470,menubar=no,toolbar=no,location=no,scrollbars=yes,sizable=yes'
        // );
        
    }
}  