import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';
import { Gscope } from '../../business_logic/Gscope';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';
import * as _ from 'lodash';

@Component({
    selector: 'previous-button',
    templateUrl: './view.html',
    styleUrls: []
})
export class PreviousButtonController {
    disabled: boolean = false;

    constructor(
        public scope: Gscope,
        public plen_controll_server_service: PLENControlServerService,
        public motion_model: MotionModel,
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
    }

    onClick(): void {
        this.scope.ComponentDisabled.next(0);
        this.scope.FrameSave.next(this.motion_model.getSelectedFrameIndex());
        this.scope.AnimationPrevious.next(0);

        
        var now_frame_index = this.motion_model.getSelectedFrameIndex();

        if (now_frame_index !== 0) {

            //只保留某一帧数据
            var dt = JSON.parse( this.motion_model.saveJSON());
            var framdt = dt["frames"][now_frame_index - 1]
            delete dt["frames"];
            dt["frames"] = [framdt];
            
            this.plen_controll_server_service.savefile("tmp.json", JSON.stringify(dt), (data) => {
                this.plen_controll_server_service.Run("tmp.json");
            });
        }
    }
} 