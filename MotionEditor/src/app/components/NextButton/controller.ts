import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';
import { Gscope } from '../../business_logic/Gscope';
import * as _ from 'lodash';

@Component({
    selector: 'next-button',
    templateUrl: './view.html',
    styleUrls: []
})
export class NextButtonController {
    disabled: boolean = false;

    constructor(
        public scope: Gscope,
        public motion_model: MotionModel,
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
    }

    onClick(): void {
        this.scope.ComponentDisabled.next(0);
        this.scope.FrameSave.next(this.motion_model.getSelectedFrameIndex());
        this.scope.AnimationNext.next(0);
    }
}  