import { Component, OnInit } from '@angular/core';

/// <reference path="../../services/SharedMotionService.ts" />

// import { MotionModel } from '../../services/SharedMotionService';
import {MotionModel} from '../../business_logic/MotionModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
// import {EventService} from '../../services/EventService';
import {Gscope} from '../../services/Gscope';

import * as $ from 'jquery';

@Component({
    selector: 'open-button',
    templateUrl: './view.html',
    styleUrls: []
  })
export class OpenButtonController
{
    disabled: boolean = false;

    static $inject = [
        "$scope",
        "SharedMotionService"
    ];

    constructor(
        public scope: Gscope,
        public motion: MotionModel,
        public model_loader: ModelLoader 
    )
    {
        scope.ComponentDisabled.subscribe((item)=>{this.disabled = true; });
        scope.ComponentEnabled.subscribe((item)=>{this.disabled = false; });
    }

    onchange(event:any):void{
        var reader = new FileReader();
        reader.onload = (event: any) =>
        {
            this.motion.loadJSON(event.target.result, this.model_loader.getAxisMap());
        };

        reader.readAsText(event.target.files[0]);
    }
} 