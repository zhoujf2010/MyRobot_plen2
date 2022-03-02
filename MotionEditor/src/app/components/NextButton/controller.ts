/// <reference path="../../services/SharedMotionService.ts" />


import { Component, OnInit } from '@angular/core';
import {ThreeModel} from '../../business_logic/ThreeModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
import {FrameModel} from '../../business_logic/FrameModel';
import {MotionModel} from '../../business_logic/MotionModel';
import {ImageStoreService} from '../../services/ImageStoreService';
import {Gscope} from '../../services/Gscope';

import * as _ from 'lodash'; 
import * as $ from 'jquery';
import { Object3D } from 'three';


@Component({
    selector: 'next-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class NextButtonController
{
    disabled: boolean = false;

    static $inject = [
        "$rootScope",
        "SharedMotionService",
        "$scope"
    ];

    constructor(
        public scope: Gscope,
        public motion_model: MotionModel,
    )
    {
        scope.ComponentDisabled.subscribe((item)=>{this.disabled = true;});
        scope.ComponentEnabled.subscribe((item)=>{this.disabled = false;});
    }

    onClick(): void
    {
        this.scope.ComponentDisabled.next(0);
        this.scope.FrameSave.next(this.motion_model.getSelectedFrameIndex());
        this.scope.AnimationNext.next(0);
    }
}  