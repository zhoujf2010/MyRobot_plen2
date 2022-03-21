import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";

import {Gscope} from '../services/Gscope';
import * as _ from 'lodash'; 
import { MOUSE } from 'three';
import { json } from 'stream/consumers';

// @todo Divide into isolated *.d.ts.
// declare module THREE
// {
//     class TransformControls
//     {
//         constructor(object: Camera, domElement?: HTMLElement);

//         setSpace(__: string): void;
//         setMode(__: string): void;
//         $onPointerDown(__: any): void;

//         object: Object3D;
//     }
// }

@Injectable({
    providedIn: 'root',
})
export class ThreeModel
{
    layout: any;

    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    grid: THREE.GridHelper;
    light: THREE.SpotLight;
    renderer: THREE.WebGLRenderer;

    home_quaternions: Array<THREE.Quaternion> = [];
    rotation_axes: Array<THREE.Object3D> = [];
    not_axes: Array<THREE.Object3D> = [];

    orbit_controls: OrbitControls;
    transform_controls: TransformControls;

    ray:THREE.Raycaster;

    constructor(
        public scope: Gscope)
    {
        // noop.
    }

    init($element: any, layout: any): void
    {
        this.layout = layout;
        var width  = this.layout.width();
        var height = this.layout.height();

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
        this.camera.up.set(0, 1, 0);
        this.camera.position.set(200, 200, 500);

        this.grid = new THREE.GridHelper(1000, 10,0xB2DB11, 0xFFFFFF);
        this.grid.position.set(0, 0, 0);
        this.scene.add(this.grid);

        this.light = new THREE.SpotLight(0xBBBBBB);
        this.scene.add(this.light);

        this.renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x66BB6A);

        this.orbit_controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.orbit_controls.zoomSpeed = 0.3;
        this.orbit_controls.minDistance = 10;
        this.orbit_controls.maxDistance = 2000;
        this.orbit_controls.enabled = true;

        this.transform_controls = new TransformControls(this.camera, this.renderer.domElement);
        this.transform_controls.setSpace("local");
        this.transform_controls.setMode("rotate");
        this.scene.add(this.transform_controls);
        this.transform_controls.addEventListener("objectChange",()=>{
            this.scope.angleChange.next(0);
        })

        // this.ray = new THREE.Raycaster();
        // this.scene.add(new THREE.ArrowHelper(this.ray.ray.direction, this.ray.ray.origin, 300, 0xff0000) );


        $element.append(this.renderer.domElement);

        this.renderer.render(this.scene, this.camera);
    }

    reset(): void
    {
        _.each(this.rotation_axes, (axis: THREE.Object3D, index: number) =>
        {
            axis.quaternion.copy(this.home_quaternions[index]);
        });
    }

    resize(): void
    {
        var width  = this.layout.width();
        var height = this.layout.height();

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    animate(): void
    {
        this.refresh();

        requestAnimationFrame(() => { this.animate(); });
    }

    refresh(): void
    {
        this.orbit_controls.update();
        // this.transform_controls.update();

        var theta  = Math.atan2(this.camera.position.x, this.camera.position.z);
        var phi    = Math.atan2(Math.sqrt(this.camera.position.x * this.camera.position.x + this.camera.position.z * this.camera.position.z), this.camera.position.y);
        var radius = Math.sqrt(3) * 1000;
        
        this.light.position.x = radius * Math.sin(phi) * Math.sin(theta);
        this.light.position.y = radius * Math.cos(phi);
        this.light.position.z = radius * Math.sin(phi) * Math.cos(theta);

        this.renderer.render(this.scene, this.camera);
    }

    intersect(screen_x: number, screen_y: number): boolean
    {
        var rect = this.renderer.domElement.getBoundingClientRect();
        var x = (screen_x - rect.left) / rect.width;
        var y = (screen_y - rect.top) / rect.height;

        //计算当前点击的部件
        var pointer_vector = new THREE.Vector3((x * 2) - 1, -(y * 2) + 1, 0.5);
        var ray = new THREE.Raycaster();
        ray.setFromCamera(pointer_vector,this.camera);

        var intersections = ray.intersectObjects(this.not_axes, true);
        var result: boolean = false;

        if (intersections.length > 0)
        {
            _.each(this.rotation_axes, (axis: THREE.Object3D) =>
            {
                if (axis === intersections[0].object.parent)
                {
                    this.transform_controls.attach(axis);
                    this.transform_controls.setMode("rotate");

                    this.transform_controls.showX = false;
                    this.transform_controls.showY = true;
                    this.transform_controls.showZ = false;
                    this.transform_controls.axis ="Y";

                    this.orbit_controls.enabled = false;
                    result = true;
                    this.scope.angleChange.next(0);
                    return false;
                }
                else
                {
                    this.orbit_controls.enabled = true;
                    return true;
                }
            });
        }else{
            this.transform_controls.detach();
            this.orbit_controls.enabled = true;
            this.scope.angleChange.next(0);
        }

        return result;
    }

    reverse3DModel(): void
    {
        var length_half = this.rotation_axes.length / 2;

        for (var index = 0; index < length_half; index++)
        {
            var angle_diff_rhs = this.getDiffAngle(this.rotation_axes[index], index);
            var angle_diff_lhs = this.getDiffAngle(this.rotation_axes[length_half + index], length_half + index);

            this.setDiffAngle(this.rotation_axes[index], -angle_diff_lhs, index);
            this.setDiffAngle(this.rotation_axes[length_half + index], -angle_diff_rhs, length_half + index);
        }
    }

    copyRightToLeft(): void
    {
        var length_half = this.rotation_axes.length / 2;

        for (var index = 0; index < length_half; index++)
        {
            var angle_diff_rhs = this.getDiffAngle(this.rotation_axes[index], index);
            this.setDiffAngle(this.rotation_axes[length_half + index], -angle_diff_rhs, length_half + index);
        }
    }

    copyLeftToRight(): void
    {
        var length_half = this.rotation_axes.length / 2;

        for (var index = 0; index < length_half; index++)
        {
            var angle_diff_lhs = this.getDiffAngle(this.rotation_axes[length_half + index], length_half + index);
            this.setDiffAngle(this.rotation_axes[index], -angle_diff_lhs, index);
        }
    }

    getDiffAngle(axis_object: THREE.Object3D | undefined, index: number = -1): any
    {
        var angle_diff = 0;

        if (!_.isUndefined(axis_object))
        {
            if (index == -1)
            {
                index = _.findIndex(this.rotation_axes, (axis: THREE.Object3D) =>
                {
                    return axis === axis_object;
                });
            }

            var home_quaternion = this.home_quaternions[index].clone();
            var axis_quaternion = this.rotation_axes[index].quaternion.clone();
            var target_quaternion = home_quaternion.inverse().multiply(axis_quaternion);

            var theta_half_diff = Math.atan2(target_quaternion.y, target_quaternion.w);

            if (Math.abs(theta_half_diff * 2) > Math.PI)
            {
                var theta_diff = 2 * Math.PI - Math.abs(theta_half_diff * 2);

                if (theta_half_diff > 0)
                {
                    theta_diff *= -1;
                }
            }
            else
            {
                var theta_diff = theta_half_diff * 2;
            }

            angle_diff = Math.round(theta_diff * 1800 / Math.PI);
        }

        return angle_diff;
    }

    setDiffAngle(axis_object: THREE.Object3D | undefined, angle_diff: number, index: number = -1): void
    {
        var theta_diff = angle_diff * Math.PI / 1800;

        if (index ==-1)
        {
            index = _.findIndex(this.rotation_axes, (axis: THREE.Object3D) =>
            {
                return axis === axis_object;
            });
        }

        var home_quaternion = this.home_quaternions[index].clone();

        var target_quaternion = new THREE.Quaternion();
        target_quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta_diff);

        home_quaternion.multiply(target_quaternion);
        this.rotation_axes[index].quaternion.copy(home_quaternion);
    }
} 