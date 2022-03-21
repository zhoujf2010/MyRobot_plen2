import { ImageStoreService } from "./ImageStoreService";
import { FrameModel } from "../business_logic/FrameModel";

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FrameFactory {
    static $inject = [
        "ImageStoreService"
    ];

    constructor(
        public image_store_service: ImageStoreService
    ) {
    }

    getFrame(selected: boolean = true): FrameModel {
        return new FrameModel(
            500,
            [],
            selected,
            this.image_store_service.get()
        );
    }
}