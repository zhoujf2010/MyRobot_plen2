// / <reference path="../../../Scripts/typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />


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
    selector: 'sync-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class SyncButtonController
{
    disabled: boolean = false;
    syncing: boolean = false;

    static $inject = [
        "$scope",
        "$rootScope",
        "PLENControlServerService"
    ];

    constructor(
        // $scope: ng.IScope,
        // public $rootScope: ng.IRootScopeService,
        // public plen_controll_server_service: PLENControlServerService
    )
    {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });

        // $scope.$on("SyncEnd", () => { this.syncing = false; });
    }

    onClick(): void
    {
        if (!this.syncing)
        {
            // if (this.plen_controll_server_service.getStatus() === SERVER_STATE.DISCONNECTED)
            // {
            //     // this.plen_controll_server_service.connect(() =>
            //     // {
            //     //     var promise: ng.IPromise<any> = this.plen_controll_server_service.asyncCheckVersionOfPLEN();

            //     //     promise.finally(() =>
            //     //     {
            //     //         if (this.plen_controll_server_service.getStatus() === SERVER_STATE.CONNECTED)
            //     //         {
            //     //             this.syncing = true;
            //     //             this.$rootScope.$broadcast("SyncBegin");
            //     //         }
            //     //     });
            //     // });
            // }
        }
        else
        {
            // this.$rootScope.$broadcast("SyncEnd");
            
            // this.plen_controll_server_service.disconnect();
        }
    }
}