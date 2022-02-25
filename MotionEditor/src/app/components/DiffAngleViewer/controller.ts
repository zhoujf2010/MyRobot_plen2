﻿import { Component, OnInit } from '@angular/core';
import { ThreeModel } from '../../business_logic/ThreeModel';
import { Gscope } from '../../services/Gscope';

@Component({
    selector: 'diff-angle-viewer',
    templateUrl: './view.html',
    styleUrls: []
})
export class DiffAngleViewerController implements OnInit {
    name: string | undefined = "none";
    diff_angle: number = 0;

    constructor(
        public scope: Gscope,
        public three_model: ThreeModel
    ) {
    }

    ngOnInit(): void {
        this.scope.angleChange.subscribe((item) => { this.onAngleChange() });
    }

    onAngleChange(): void {
        this.name = this.three_model.transform_controls.object?.name;
        this.diff_angle = this.three_model.getDiffAngle(this.three_model.transform_controls.object) / 10;
    }
}