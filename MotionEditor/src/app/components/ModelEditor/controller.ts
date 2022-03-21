/// <reference path="../../services/SharedThreeService.ts" />
/// <reference path="../../services/SharedMotionService.ts" />
/// <reference path="../../services/ImageStoreService.ts" />

import { Component, OnInit } from '@angular/core';
import { ThreeModel } from '../../business_logic/ThreeModel';
import { ModelLoader } from '../../business_logic/ModelLoader';
import { FrameModel } from '../../business_logic/FrameModel';
import { MotionModel } from '../../business_logic/MotionModel';
import { ImageStoreService } from '../../services/ImageStoreService';
import { Gscope } from '../../services/Gscope';

import { OutputDeviceModel } from "../../business_logic/OutputDeviceModel";

import * as _ from 'lodash';
import * as $ from 'jquery';
import { Object3D } from 'three';


@Component({
    selector: 'model-editor',
    templateUrl: './view.html',
    styleUrls: []
})
export class ModelEditorController implements OnInit {
    disabled: boolean = false;

    static $inject = [
        "$scope",
        "ModelLoaderService",
        "SharedThreeService",
        "SharedMotionService",
        "ImageStoreService"
    ];
    layout = {};
    static WIDTH_OFFSET: number = 220 + 45;
    static HEIGHT_OFFSET: number = 186 + 40;
    layout_height = 0;
    layout_width = 0;

    constructor(
        public scope: Gscope,
        public model_loader: ModelLoader,
        public three_model: ThreeModel,
        public motion: MotionModel,
        public image_store_service: ImageStoreService
    ) {

        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
        scope.E3DModelReset.subscribe((item) => { this.on3DModelReset(); });
        scope.E3DModelLoaded.subscribe((item) => { this.on3DModelLoaded(); });

        scope.RefreshThumbnail.subscribe((item) => { this.onRefreshThumbnail(); });
        scope.FrameSave.subscribe((item) => { this.onFrameSave(item); });
        scope.FrameLoad.subscribe((item) => { this.onFrameLoad(item); });
        scope.SaveFrame.subscribe((item)=>{this.setImage();});

        this.layout = {
            width: () => {
                return window.innerWidth - ModelEditorController.WIDTH_OFFSET;
            },
            height: () => {
                return window.innerHeight - ModelEditorController.HEIGHT_OFFSET;
            },
            resizeFook: () => {
                three_model.resize();
            }
        };
        this.layout_height = window.innerHeight - ModelEditorController.HEIGHT_OFFSET + 20;
        this.layout_width = window.innerWidth - ModelEditorController.WIDTH_OFFSET + 20;


    }
    ngOnInit(): void {
        // $('#canvas_wrapper').text("Hello");
        this.three_model.init($('#canvas_wrapper'), this.layout);
        this.three_model.animate();

        // The hook when pointer is focused.
        $('#canvas_wrapper canvas').on('mousedown touchstart', (event: Event) => {
            this.onFocus(event);
        });

        // The hook when pointer is unfocused.
        $('#canvas_wrapper canvas').on('mouseup mouseout touchend touchcancel touchleave', () => {
            this.onUnfocus();
            //    $scope.$apply();
        });


        this.model_loader.scene = this.three_model.scene;
        this.model_loader.loadJSON();

    }

    onResize(): void {
        this.three_model.resize();
    }

    on3DModelLoaded(): void {
        this.setImage();

        this.three_model.home_quaternions = this.model_loader.home_quaternions;
        this.three_model.rotation_axes = this.model_loader.rotation_axes;
        this.three_model.not_axes = this.model_loader.not_axes;

        var json = localStorage.getItem("motion");

        if (!_.isNull(json)) {
            this.motion.loadJSON(json, this.model_loader.getAxisMap());
        }
    }

    on3DModelReset(): void {
        this.three_model.reset();
        this.setImage();
    }

    onRefreshThumbnail(): void {
        this.setImage();
    }

    onFrameSave(frame_index: number): void {
        this.motion.frames[frame_index].outputs = [];

        _.each(this.three_model.rotation_axes, (axis: THREE.Object3D, index: number) => {
            this.motion.frames[frame_index].outputs.push(new OutputDeviceModel(
                axis.name,
                this.three_model.getDiffAngle(axis, index)
            ));
        });
    }

    onFrameLoad(frame_index: number): void {
        if (_.isEmpty(this.motion.frames[frame_index].outputs)) {
            this.three_model.reset();
            this.setImage();
        }
        else {
            _.each(this.motion.frames[frame_index].outputs, (output: OutputDeviceModel, index: number) => {
                this.three_model.setDiffAngle(new Object3D(), output.value, index);
            });
        }

        if (_.isEmpty(this.motion.frames[frame_index].image_uri)) {
            this.setImage();
        }
    }

    onFocus($event): void {
        if (this.disabled) {
            return;
        }
        // console.info($event.clientX + " == " + $event.clientY);

        if (!_.isUndefined($event.touches)) {
            if ($event.touches.length === 1) {
                var intersected: boolean = this.three_model.intersect($event.clientX, $event.clientY);

                if (intersected) {
                    // this.three_model.transform_controls.$onPointerDown($event);

                }
            }
        }
        else {
            var intersected: boolean = this.three_model.intersect($event.clientX, $event.clientY);

            if (intersected) {
                // this.three_model.transform_controls.$onPointerDown($event);
            }
        }
    }

    onUnfocus(): void {
        // this.three_model.transform_controls.detach();
        // this.three_model.orbit_controls.enabled = true;

        this.setImage();
    }

    setImage(): void {
        this.three_model.refresh();

        var image = this.three_model.renderer.domElement;
        this.image_store_service.set(image);

        var selected_frame = _.find(this.motion.frames, (frame: FrameModel) => {
            return frame.selected;
        });
        if (selected_frame != undefined)
            selected_frame.image_uri = this.image_store_service.get();


        if (selected_frame != undefined) {

            //保存当前页数据
            selected_frame.outputs = [];

            _.each(this.three_model.rotation_axes, (axis: THREE.Object3D, index: number) => {
                if (selected_frame != undefined) {
                    selected_frame.outputs.push(new OutputDeviceModel(
                        axis.name,
                        this.three_model.getDiffAngle(axis, index)
                    ));
                }
            });
        }
    }
}