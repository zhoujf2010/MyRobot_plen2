/// <reference path="../../services/SharedMotionService.ts" />
/// <reference path="../../services/AnimationHelperService.ts" />


import { Component, OnInit } from '@angular/core';
import {ThreeModel} from '../../business_logic/ThreeModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
import {FrameModel} from '../../business_logic/FrameModel';
import {MotionModel} from '../../business_logic/MotionModel';
import {AnimationHelper} from '../../business_logic/AnimationHelper';
import {ImageStoreService} from '../../services/ImageStoreService';
import {Gscope} from '../../services/Gscope';

import * as _ from 'lodash'; 
import * as $ from 'jquery';
import { Object3D } from 'three';


@Component({
    selector: 'frame-editor',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class FrameEditorController implements OnInit 
{
    disabled: boolean = false;
    touch_disabled: boolean = 'ontouchend' in document;

    index:number =0;

    sortable_options = {
        axis: "x",
        scroll: false,
        revert: true
    };

    static $inject = [
        "$scope",
        "SharedMotionService",
        "AnimationHelperService"
    ];

    constructor(
        public scope: Gscope,
        public motion: MotionModel,
        public animation_helper: AnimationHelper
    )
    {
        scope.ComponentDisabled.subscribe((item)=>{this.disabled = true;});
        scope.ComponentEnabled.subscribe((item)=>{this.disabled = false;});
    }

    ngOnInit(): void {
        
    }

    onClick($event: any): void
    {
        if ($event.target.id === "frame_editor")
        {
            var offset_x;

            // Fix for firefox.
            if (_.isUndefined($event.offsetX))
            {
                // offset_x = $event.pageX - $($event.target).offset().left;
            }
            else
            {
                offset_x = $event.offsetX;
            }

            var insert_pos = Math.floor(offset_x / 173);

            if (insert_pos > this.motion.frames.length)
            {
                this.motion.addFrame(this.motion.frames.length);
            }
            else
            {
                this.motion.addFrame(insert_pos);
            }
        }
    }
}