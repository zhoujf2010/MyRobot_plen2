import { Component } from '@angular/core';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';
import { Gscope } from '../../business_logic/Gscope';
import { ThreeModel } from '../../business_logic/ThreeModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'Logo-button',
    templateUrl: './view.html',
    styleUrls: ['style.css']
})

export class LogoController {
    logurl: string;
    showmodel: boolean;
    currentsel: number;
    angle: number;
    currentfile: string;

    constructor(
        public scope: Gscope,
        public three_model: ThreeModel,
        public plen_controll_server_service: PLENControlServerService,
        public modalService: NgbModal
    ) {
        this.logurl = "logo2.png";
        this.currentfile = "46_Walk_Forward.json";

        scope.RobotConnected.subscribe((item) => { this.logurl = "logo.png"; });
        scope.RobotDisConnected.subscribe((item) => { this.logurl = "logo2.png"; });

        scope.ReadLoadData.subscribe((item) => { this.angle = item[1] });

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

    closeModel(): void {
        this.showmodel = false;
    }

    addStep(v: number): void {
        this.angle += v;
        this.plen_controll_server_service.addStep(this.currentsel, this.angle);
    }

    rangechg(): void {
        this.plen_controll_server_service.addStep(this.currentsel, this.angle);
    }

    save(): void {
        this.plen_controll_server_service.saveAngle(this.currentsel, this.angle);
    }

    load0(): void {
        this.plen_controll_server_service.load0(this.currentsel);
    }

    Run(): void {
        this.plen_controll_server_service.Run(this.currentfile);
    }

    Stand(): void {
        this.plen_controll_server_service.Stand();
    }

    WriteZero(): void {
        this.plen_controll_server_service.writeZero();
    }
}  