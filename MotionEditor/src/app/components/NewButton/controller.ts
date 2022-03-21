import { Gscope } from '../../business_logic/Gscope';
import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';

@Component({
    selector: 'new-button',
    templateUrl: './view.html',
    styleUrls: []
})
export class NewButtonController {
    disabled: boolean = false;

    constructor(
        public scope: Gscope,
        public motion: MotionModel
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
    }

    onClick(): void {
        var result = window.confirm(
            `Are you sure you want to create a new motion?
Working contents will have destroyed.
If your motion has not been saved yet, please click to the "Cancel" button.`
        );

        if (result === true) {
            this.motion.reset();
            this.scope.E3DModelReset.next(0);
        }
    }
}