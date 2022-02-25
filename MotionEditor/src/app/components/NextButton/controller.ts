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
        // public $rootScope: ng.IRootScopeService,
        public motion_model: MotionModel,
        // $scope: ng.IScope
    )
    {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });
    }

    onClick(): void
    {
        // this.$rootScope.$broadcast("ComponentDisabled");
        // this.$rootScope.$broadcast("FrameSave", this.motion_model.getSelectedFrameIndex());
        // this.$rootScope.$broadcast("AnimationNext");
    }
}  