import { Component, OnInit } from '@angular/core';
import { ThreeModel } from '../../business_logic/ThreeModel';
import { Gscope } from '../../business_logic/Gscope';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';

@Component({
    selector: 'changeAngle-viewer',
    templateUrl: './view.html',
    styleUrls: []
})
export class ChangeAngleController implements OnInit {
    name: string | undefined = "none";
    diff_angle: number = 0;
    angle: number = 0;
    visible: boolean = false;

    constructor(
        public scope: Gscope,
        public three_model: ThreeModel,
        public service: PLENControlServerService
    ) {
    }

    ngOnInit(): void {
        this.scope.angleChange.subscribe((item) => { this.onAngleChange() });
    }

    onAngleChange(): void {
        this.name = this.three_model.transform_controls.object?.name;
        this.diff_angle = this.three_model.getDiffAngle(this.three_model.transform_controls.object);

        this.angle = this.diff_angle;
        this.visible = this.name != "" && this.name != "none" && this.name != undefined;
    }

    rangechg(): void {

        this.name = this.three_model.transform_controls.object?.name;
        if (this.name == null)
            return;

        if (this.angle > this.service.getMaxAngle(this.name))
            this.angle = this.service.getMaxAngle(this.name);
        if (this.angle < this.service.getMinAngle(this.name))
            this.angle = this.service.getMinAngle(this.name);

            
        this.diff_angle = this.angle;
        this.three_model.setDiffAngle(this.three_model.transform_controls.object, this.diff_angle);

        this.scope.SaveFrame.next(0);
        this.scope.angleChange.next(0);
    }

    onAddAngle(def: number): void {
        this.angle += def;
        this.rangechg();
    }
}