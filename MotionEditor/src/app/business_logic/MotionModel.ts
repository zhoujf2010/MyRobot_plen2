import { Injectable } from '@angular/core';
import { FrameModel } from "./FrameModel";
import { Subject } from 'rxjs';
import { Gscope } from './Gscope';
import { OutputDeviceModel } from "./OutputDeviceModel";
import { CodeModel } from "./CodeModel";
import * as _ from 'lodash';
import * as $ from 'jquery';
import { FrameFactory } from "./FrameFactory"

@Injectable({
    providedIn: 'root',
})
export class MotionModel {
    test = new Subject<string>();

    slot: number = 44;
    name: string = "Empty";
    filename: string = "";
    codes: Array<CodeModel> = [];
    frames: Array<FrameModel> = [];

    static MIN_FRAMES: number = 1;
    static MAX_FRAMES: number = 20;

    static $inject = [
        "$scope",
    ];

    constructor(
        public scope: Gscope,
        public frame_factory: FrameFactory
    ) {
        this.frames.push(this.frame_factory.getFrame());

        $(window).on("beforeunload", () => {
            this.scope.FrameLoad.next(this.getSelectedFrameIndex()); // rootScope.$broadcast("FrameSave", this.getSelectedFrameIndex());
            localStorage.setItem("motion", this.saveJSON());
        });
    }

    getSelectedFrameIndex(): number {
        return _.findIndex(this.frames, (frame: FrameModel) => { return frame.selected; });
    }

    removeFrame(index: number): void {
        if (this.frames.length !== MotionModel.MIN_FRAMES) {
            if (this.frames[index].selected === true) {
                if ((index + 1) === this.frames.length) {
                    this.selectFrame(index - 1);
                }
                else {
                    this.selectFrame(index + 1);
                }
            }

            this.frames.splice(index, 1);
        }
        else {
            this.reset();
        }
    }

    addFrame(index: number): void {
        if (this.frames.length >= MotionModel.MAX_FRAMES) {
            return;
        }

        var selected_frame: FrameModel | undefined = _.find(this.frames, (frame: FrameModel) => {
            return frame.selected;
        });

        var copy_index = _.findIndex(this.frames, (frame: FrameModel) => { return frame.selected; });
        this.scope.FrameLoad.next(copy_index);

        var insertion_frame = this.frame_factory.getFrame(false);
        insertion_frame.deepCopy(selected_frame);
        insertion_frame.selected = false;

        this.frames.splice(index, 0, insertion_frame);
        this.selectFrame(index, false);
    }

    selectFrame(index: number, old_save: boolean = true, broadcast_finished: boolean = true): void {
        if (old_save) {
            var old_index = _.findIndex(this.frames, (frame: FrameModel) => { return frame.selected; });
            this.scope.FrameLoad.next(old_index);
        }

        _.each(this.frames, (frame: FrameModel) => { frame.selected = false; });
        this.frames[index].selected = true;
        this.scope.FrameLoad.next(index);

        if (broadcast_finished) {
            this.scope.FrameLoadFinished.next(0);
        }
    }

    selectNextFrame(): void {
        var index = _.findIndex(this.frames, (frame: FrameModel) => { return frame.selected; });

        if ((index + 1) !== this.frames.length) {
            this.selectFrame(index + 1);
        }
    }

    selectPrevFrame(): void {
        var index = _.findIndex(this.frames, (frame: FrameModel) => { return frame.selected; });

        if (index !== 0) {
            this.selectFrame(index - 1);
        }
    }

    reset(): void {
        this.name = "Empty";
        this.slot = 44;
        this.codes = [];
        this.frames = [this.frame_factory.getFrame()];

        this.scope.FrameLoad.next(0);// this.$rootScope.$broadcast("FrameLoad", 0);
    }

    loadJSON(motion_json: string, axis_map: any): void {
        try {
            var motion_obj = JSON.parse(motion_json);

            if (_.isUndefined(motion_obj.slot) || !_.isNumber(motion_obj.slot)) {
                throw "Bad format!";
            }

            if (_.isUndefined(motion_obj.name) || !_.isString(motion_obj.name)) {
                throw "Bad format!";
            }

            if (_.isUndefined(motion_obj.codes) || !_.isArray(motion_obj.codes)) {
                throw "Bad format!";
            }

            _.each(motion_obj.codes, (code: CodeModel) => {
                if (_.isUndefined(code.method) || !_.isString(code.method)) {
                    throw "Bad format!";
                }

                if (_.isUndefined(code.arguments) || !_.isArray(code.arguments)) {
                    throw "Bad format!";
                }
                else {
                    _.each(code.arguments, (argment: number) => {
                        if (!_.isNumber(argment)) {
                            throw "Bad format!";
                        }
                    });
                }
            });

            if (_.isUndefined(motion_obj.frames) || !_.isArray(motion_obj.frames)) {
                throw "Bad format!";
            }
            else {
                _.each(motion_obj.frames, (frame: FrameModel) => {
                    if (_.isUndefined(frame.transition_time_ms) || !_.isNumber(frame.transition_time_ms)) {
                        throw "Bad format!";
                    }

                    if (_.isUndefined(frame.outputs) || !_.isArray(frame.outputs)) {
                        throw "Bad format!";
                    }
                    else {
                        _.each(frame.outputs, (output: OutputDeviceModel) => {
                            if (_.isUndefined(output.device) || !_.isString(output.device)) {
                                throw "Bad format!";
                            }

                            if (_.isUndefined(output.value) || !_.isNumber(output.value)) {
                                throw "Bad format!";
                            }
                        });
                    }
                });
            }

            this.slot = motion_obj.slot;
            this.name = motion_obj.name;

            this.codes = [];
            _.each(motion_obj.codes, (code: CodeModel) => {
                var args = [];
                _.each(code.arguments, (argment: any) => {
                    args.push(argment as never);
                });

                this.codes.push(new CodeModel(code.method, args));
            });

            this.frames = [];
            _.each(motion_obj.frames, (frame: FrameModel) => {
                var outputs = [] as any;
                _.each(frame.outputs, (output: OutputDeviceModel) => {
                    outputs[axis_map[output.device]] = new OutputDeviceModel(output.device, output.value);
                });

                this.frames.push(new FrameModel(frame.transition_time_ms, outputs, false, ""));
            });

            this.selectFrame(0, false);
        }
        catch (exception) {
            console.error(exception);
            alert("Loading a motion file failed. This file has invalid format.");
        }
    }

    saveJSON(): string {
        var motion_obj = {
            slot: this.slot,
            name: this.name,
            codes: this.codes,
            frames: []
        };

        _.each(this.frames, (frame: FrameModel) => {
            var pure_frame: any = {};
            pure_frame.transition_time_ms = frame._transition_time_ms;
            pure_frame.outputs = frame.outputs;

            _.each(pure_frame.outputs, (output: OutputDeviceModel) => {
                output.value = Math.round(output.value);
            });

            motion_obj.frames.push(pure_frame as never);
        });

        return JSON.stringify(motion_obj, null, "\t");
    }
} 