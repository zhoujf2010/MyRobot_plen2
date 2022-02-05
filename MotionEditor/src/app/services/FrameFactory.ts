/// <reference path="./ImageStoreService.ts" />
/// <reference path="../business_logic/FrameModel.ts" />

import {ImageStoreService} from "../services/ImageStoreService";
import {FrameModel} from "../business_logic/FrameModel";

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FrameFactory
{
    static $inject = [
        "ImageStoreService"
    ];

    constructor(
        public image_store_service: ImageStoreService
    )
    {
        // noop.
    }

    getFrame(selected: boolean = true): FrameModel
    {
        return new FrameModel(
            500,
            [],
            selected,
            this.image_store_service.get()
        );
    }
}

// angular.module(APP_NAME).service("FrameFactory", FrameFactory); 