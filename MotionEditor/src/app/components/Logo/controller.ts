import { Component, OnInit } from '@angular/core';
import * as angular from "angular";
import { PLENControlServerService } from '../../services/PLENControlServerService';
import { Gscope } from '../../services/Gscope';
import { ThreeModel } from '../../business_logic/ThreeModel';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



@Component({
    selector: 'Logo-button',
    templateUrl: './view.html',
    styleUrls: ['style.css']
})

export class LogoController {
    logurl: string;
    showmodel:boolean;
    currentsel:number;
    angle:number;

    constructor(
        public scope: Gscope,
        public three_model: ThreeModel,
        public plen_controll_server_service: PLENControlServerService,
        public modalService: NgbModal
    ) {
        this.logurl = "logo2.png";

        scope.RobotConnected.subscribe((item) => { this.logurl = "logo.png"; });
        scope.RobotDisConnected.subscribe((item) => { this.logurl = "logo2.png"; });

        scope.angleChange.subscribe((item) => { this.onAngleChange() });
        this.showmodel = false;
        this.currentsel = 1;
        this.angle = 0;
    }

    onAngleChange(): void {
        var name = this.three_model.transform_controls.object?.name;
        var diff_angle = this.three_model.getDiffAngle(this.three_model.transform_controls.object);
        this.plen_controll_server_service.sendAngle(name, diff_angle);
    }

    onClick(): void {
        if (this.logurl == "logo2.png") {
            alert("未连接机器人");
            return;
        }
        this.showmodel = true;
    }

    closeModel():void{
        this.showmodel = false;
    }

    addStep(v:number):void{
        this.angle += v;
        this.plen_controll_server_service.addStep(this.currentsel,this.angle);
    }

    rangechg():void{
        this.plen_controll_server_service.addStep(this.currentsel,this.angle);
    }
}  