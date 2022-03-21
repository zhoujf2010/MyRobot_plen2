import { Component, OnInit } from '@angular/core';
import {ThreeModel} from '../../business_logic/ThreeModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
import {FrameModel} from '../../business_logic/FrameModel';
import {MotionModel} from '../../business_logic/MotionModel';
import {ImageStoreService} from '../../services/ImageStoreService';
import {Gscope} from '../../services/Gscope';
import { PLENControlServerService } from '../../services/PLENControlServerService';

import * as _ from 'lodash'; 
import * as $ from 'jquery';
import { Object3D } from 'three';


@Component({
    selector: 'play-pause-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class PlayPauseButtonController
{
    playing: boolean = false;
    installing: boolean = false;
    title: string = "Play a motion.";

    static $inject = [
        "PLENControlServerService",
        "$scope",
        "$rootScope",
        "SharedMotionService"
    ];

    constructor(
        public scope: Gscope,
        public plen_controll_server_service: PLENControlServerService,
        public motion: MotionModel
    )
    {
        scope.ComponentDisabled.subscribe((item)=>{this.playing = true; this.title = "Pause a motion."; });
        scope.ComponentEnabled.subscribe((item)=>{this.playing = false; this.title = "Play a motion."; });
        scope.InstallFinished.subscribe((item)=>{this.installing = false;  });
    }

    onClick(): void
    {
        
        this.plen_controll_server_service.savefile("tmp.json",this.motion.saveJSON(),(data)=>{
            
            this.plen_controll_server_service.Run("tmp.json");

        });

        if (this.playing === false)
        {
            // if (this.plen_controll_server_service.getStatus() === SERVER_STATE.CONNECTED)
            // {
            //     // var success_callback = () =>
            //     // {
            //     //     this.plen_controll_server_service.play(this.motion.slot, () =>
            //     //     {
            //     //         this.$rootScope.$broadcast("ComponentDisabled");
            //     //         this.$rootScope.$broadcast("AnimationPlay");

            //     //         this.plen_controll_server_service.play(this.motion.slot);
            //     //     });
            //     // };

            //     // this.$rootScope.$broadcast("FrameSave", this.motion.getSelectedFrameIndex());
            //     // this.plen_controll_server_service.install(JSON.parse(this.motion.saveJSON()), success_callback);
            //     this.installing = true;

            //     return;
            // }

            this.scope.ComponentDisabled.next(0);
            this.scope.FrameSave.next(this.motion.getSelectedFrameIndex());
            this.scope.AnimationPlay.next(0);
        }
        else if (!this.installing)
        {
            this.scope.AnimationStop.next(0);

            // if (this.plen_controll_server_service.getStatus() === SERVER_STATE.CONNECTED)
            // {
            //     this.plen_controll_server_service.stop();
            // }
        }
    }
} 