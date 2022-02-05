import { Component, OnInit } from '@angular/core';

/// <reference path="../../services/SharedMotionService.ts" />

// import { MotionModel } from '../../services/SharedMotionService';
import {MotionModel} from '../../business_logic/MotionModel';
import {ModelLoader} from '../../business_logic/ModelLoader';
// import {EventService} from '../../services/EventService';

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
    //    $scope: ng.IScope, 
    // $scope: app.IScope,
    //    public event:EventService<string>,
        public motion: MotionModel,
        public model_loader: ModelLoader 
    )
    {
        // var scope = $rootScope;

        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });

        // event.Subscribe("aa").subscribe((item)=>{alert(item);});
        motion.test.subscribe((item)=>{alert(item);});
    }

    onchange(event:any):void{
        var reader = new FileReader();
        reader.onload = (event: any) =>
        {
            // this.event.Broadcast("aa","xxx");
            // alert(event.target.result);
            this.motion.loadJSON(event.target.result, this.model_loader.getAxisMap());
            // $scope.$ctrl.motion.loadJSON(event.target.result, model_loader.getAxisMap());
            // $scope.$apply();
        };

        reader.readAsText(event.target.files[0]);
    }
} 