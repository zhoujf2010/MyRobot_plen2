import { Component, OnInit } from '@angular/core';

/// <reference path="../../services/SharedMotionService.ts" />

// import { MotionModel } from '../../services/SharedMotionService';
import {MotionModel} from '../../business_logic/MotionModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
// import {EventService} from '../../services/EventService';
import {Gscope} from '../../services/Gscope';
import { PLENControlServerService } from '../../services/PLENControlServerService';

import * as $ from 'jquery';

@Component({
    selector: 'open-button',
    templateUrl: './view.html',
    styleUrls: ["./style.css"]
  })
export class OpenButtonController
{
    disabled: boolean = false;
    showmodel:boolean = false;
    filelst:any;

    static $inject = [
        "$scope",
        "SharedMotionService"
    ];

    constructor(
        public scope: Gscope,
        public motion: MotionModel,
        public model_loader: ModelLoader ,
        public plen_controll_server_service: PLENControlServerService
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

    onClick():void{
        this.showmodel = true;

        this.plen_controll_server_service.getList((data)=>{
            this.filelst = data;
                // alert(JSON.stringify(data));
        });
    }

    closeModel():void{
        this.showmodel = false;
    }

    openfile(file):void{
        this.plen_controll_server_service.openfile(file.value,(data)=>{
            this.showmodel = false;

            this.motion.loadJSON(JSON.stringify(data), this.model_loader.getAxisMap());
            this.motion.name = file.value.replace(".json","").replace(".JSON","");
        });
    }
} 