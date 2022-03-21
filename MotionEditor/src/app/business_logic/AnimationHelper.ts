import { Injectable } from '@angular/core';

import { MotionModel } from "./MotionModel";
import { CodeModel } from "./CodeModel";
import { Gscope } from './Gscope';
import * as _ from 'lodash';

import { OutputDeviceModel } from "./OutputDeviceModel";
import { IntervalService } from './IntervalService';

@Injectable({
    providedIn: 'root',
})
export class AnimationHelper {
    static $inject = [
        "$rootScope",
        "$interval",
        "SharedMotionService"
    ];

    static FPS: number = 30;

    private _outputs_backup: Array<number> = [];
    private _angle_diffs: Array<number> = [];
    private _animation_promise: any;

    constructor(
        public scope: Gscope,
        public interval: IntervalService,
        public motion: MotionModel
    ) {
        scope.AnimationPlay.subscribe((item) => { this.onAnimationPlay(); });
        scope.AnimationStop.subscribe((item) => { this.onAnimationStop(); });

        scope.AnimationPrevious.subscribe((item) => {
            var now_frame_index = this.motion.getSelectedFrameIndex();

            if (now_frame_index !== 0) {
                this.onAnimationPlayOnce(now_frame_index - 1);
            }
            else {
                scope.ComponentEnabled.next(0);
            }
        });

        scope.AnimationNext.subscribe((item) => {
            var now_frame_index = this.motion.getSelectedFrameIndex();

            if (now_frame_index !== (this.motion.frames.length - 1)) {
                this.onAnimationPlayOnce(now_frame_index + 1);
            }
            else {
                scope.ComponentEnabled.next(0);
            }
        });
    }

    onAnimationPlayOnce(next_frame_index: number, continuous_callback: any = null): void {
        var now_frame_index = this.motion.getSelectedFrameIndex();

        var now_frame = this.motion.frames[now_frame_index];
        var next_frame = this.motion.frames[next_frame_index];

        var transition_count = Math.ceil(next_frame.transition_time_ms / (1000 / AnimationHelper.FPS));

        this._outputs_backup = [];
        this._angle_diffs = [];
        _.each(now_frame.outputs, (output: OutputDeviceModel, index: number) => {
            this._outputs_backup.push(output.value);
            this._angle_diffs.push((next_frame.outputs[index].value - output.value) / transition_count);
        });

        this._animation_promise = this.interval.create(() => {
            _.each(this._angle_diffs, (angle_diff: number, index: number) => {
                now_frame.outputs[index].value += angle_diff;
            });

            this.scope.FrameLoad.next(now_frame_index);
        }, (1000 / AnimationHelper.FPS), transition_count);

        // this._animation_promise.catch(() =>
        //     {
        //         continuous_callback = null;
        //     });
        this._animation_promise.finally(() => {
            _.each(now_frame.outputs, (output: OutputDeviceModel, index: number) => {
                output.value = this._outputs_backup[index];
            });

            this.motion.selectFrame(next_frame_index, false, false);

            if (continuous_callback === null) {
                this.scope.ComponentEnabled.next(0);
            }
            else {
                continuous_callback();
            }
        })
    }

    onAnimationPlay(): void {
        var use_loop: boolean = false;
        var loop_begin: number = 0;
        var loop_end: number = 0;
        var loop_count: number = 0;
        var loop_infinity: boolean = false;

        _.each(this.motion.codes, (code: CodeModel) => {
            if (code.method === "loop") {
                use_loop = true;
                loop_begin = code.arguments[0];
                loop_end = code.arguments[1];
                loop_count = code.arguments[2];


                if (loop_count === 255) {
                    loop_infinity = true;
                }

                return false;
            }
            return false;
        });

        var callback = () => {
            var now_frame_index = this.motion.getSelectedFrameIndex();

            if (use_loop && (now_frame_index === loop_end)) {
                if ((loop_count > 0) || loop_infinity) {
                    loop_count--;
                    this.onAnimationPlayOnce(loop_begin, callback);

                    return;
                }
            }

            if (now_frame_index !== (this.motion.frames.length - 1)) {
                this.onAnimationPlayOnce(now_frame_index + 1, callback);
            }
            else {
                this.scope.ComponentEnabled.next(0);
            }
        };

        if (this.motion.getSelectedFrameIndex() !== 0) {
            this.onAnimationPlayOnce(0, callback);
        }
        else if (this.motion.frames.length > 1) {
            this.onAnimationPlayOnce(1, callback);
        }
        else {
            this.scope.ComponentEnabled.next(0);
        }
    }

    onAnimationStop(): void {
        this.interval.cancel(this._animation_promise);
    }
}