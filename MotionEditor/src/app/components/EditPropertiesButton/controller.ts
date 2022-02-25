

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
    selector: 'edit-properties-button',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class EditPropertiesButtonController
{
    disabled: boolean = false;

    static $inject = [
        "$scope",
        "$modal"
    ];

    constructor(
        // $scope: ng.IScope,
        // public $modal: angular.ui.bootstrap.IModalService
    )
    {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });
    }

    onClick(): void
    {
        // var modal = this.$modal.open({
        //     controller: EditPropertiesModalController,
        //     controllerAs: "$ctrl",
        //     templateUrl: "./angularjs/components/EditPropertiesModal/view.html",
        //     backdrop: 'static',
        //     keyboard: false
        // });
    }
}