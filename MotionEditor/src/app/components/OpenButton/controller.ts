/// <reference path="../../services/SharedMotionService.ts" />

// import { MotionModel } from '../../services/SharedMotionService';
import {MotionModel} from '../../business_logic/MotionModel';

class OpenButtonController
{
    disabled: boolean = false;

    static $inject = [
        "$scope",
        "SharedMotionService"
    ];

    constructor(
        $scope: ng.IScope,
        public motion: MotionModel
    )
    {
        $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        $scope.$on("ComponentEnabled", () => { this.disabled = false; });
    }
} 