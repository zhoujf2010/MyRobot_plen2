///// <reference path="../../services/SharedMotionService.ts" />
import { Component, OnInit } from '@angular/core';
import {MotionModel} from '../../business_logic/MotionModel';
import { PLENControlServerService } from '../../services/PLENControlServerService';

@Component({
    selector: 'save-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class SaveButtonController
{
    disabled: boolean = false;

    // static $inject = [
    //     "$rootScope",
    //     "$scope",
    //     "$element",
    //     "SharedMotionService"
    // ];

    constructor(
        // public $rootScope: ng.IRootScopeService,
        // $scope: ng.IScope,
        // public $element,
        public motion: MotionModel,
        public plen_controll_server_service: PLENControlServerService
    )
    {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });

        // $element.on("touchstart", () => { this.onClick(); });
    }

    onClick(): void
    {
        // if (!this.disabled)
        // {
        //     // this.$rootScope.$broadcast("FrameSave", this.motion.getSelectedFrameIndex());
        //     this.setDownloadLink();
        // }

        this.plen_controll_server_service.savefile(this.motion.name + ".json",this.motion.saveJSON(),(data)=>{
            alert(JSON.stringify(data));
        });

    }

    setDownloadLink(): void
    {
        var json_blob = new Blob([this.motion.saveJSON()], { type: "text/plain" });

        // if (navigator.msSaveBlob)
        // {
        //     navigator.msSaveBlob(json_blob, this.motion.name + ".json");
        // }
        // else
        // {
        //     var reader = new FileReader();
        //     reader.onload = (event: any) =>
        //     {
        //         this.$element[0].href = reader.result;
        //     };

        //     reader.readAsDataURL(json_blob);
        // }
    }
}  