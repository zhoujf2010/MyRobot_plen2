import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';
import { Gscope } from '../../business_logic/Gscope';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';
import * as _ from 'lodash';

@Component({
    selector: 'play-pause-button',
    templateUrl: './view.html',
    styleUrls: []
})
export class PlayPauseButtonController {
    playing: boolean = false;
    installing: boolean = false;
    title: string = "Play a motion.";

    constructor(
        public scope: Gscope,
        public plen_controll_server_service: PLENControlServerService,
        public motion: MotionModel
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.playing = true; this.title = "Pause a motion."; });
        scope.ComponentEnabled.subscribe((item) => { this.playing = false; this.title = "Play a motion."; });
        scope.InstallFinished.subscribe((item) => { this.installing = false; });
    }

    onClick(): void {
        if (this.playing === false) {
            this.scope.ComponentDisabled.next(0);
            this.scope.FrameSave.next(this.motion.getSelectedFrameIndex());
            this.scope.AnimationPlay.next(0);

            this.plen_controll_server_service.savefile("tmp.json", this.motion.saveJSON(), (data) => {
                this.plen_controll_server_service.Run("tmp.json");
            });
        }
        else if (!this.installing) {
            this.scope.AnimationStop.next(0);

            this.plen_controll_server_service.StopAction();
        }
    }
} 