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
    selector: 'previous-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class PreviousButtonController
{
    disabled: boolean = false;

    static $inject = [
        "$scope",
        "SharedMotionService",
        "$rootScope"
    ];

    constructor(
        // $scope: ng.IScope,
        public motion_model: MotionModel,
        // public $rootScope: ng.IRootScopeService
    )
    {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });
    }

    onClick(): void
    {
        // this.$rootScope.$broadcast("ComponentDisabled");
        // this.$rootScope.$broadcast("FrameSave", this.motion_model.getSelectedFrameIndex());
        // this.$rootScope.$broadcast("AnimationPrevious");
    }
} 