﻿/// <reference path="./controller.ts" />

class NewButtonDirective
{
    static getDDO()
    {
        return {
            restrict: "E",
            controller: NewButtonController,
            controllerAs: "$ctrl",
            scope: {},
            templateUrl: "./angularjs/components/NewButton/view.html",
            replace: true
        };
    }
}

angular.module(APP_NAME).directive("newButton",
    [
        NewButtonDirective.getDDO
    ]
);