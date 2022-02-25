﻿import { Injectable } from '@angular/core';
import * as THREE from 'three';
import * as _ from 'lodash'; 
import * as $ from 'jquery';
import fetch from 'node-fetch';
import {Gscope} from '../services/Gscope';


@Injectable({
    providedIn: 'root',
})
export class ModelLoader
{
    home_quaternions: Array<THREE.Quaternion> = [];
    rotation_axes: Array<THREE.Object3D> = [];
    not_axes: Array<THREE.Object3D> = [];

    scene: THREE.Scene;

    constructor(
        public scope: Gscope,
        // public $rootScope: ng.IRootScopeService,
        // public $http: ng.IHttpService
    )
    {
        // noop.
        this.scene = new THREE.Scene();
    }

    addRotationAxis(object: THREE.Object3D): void
    {
        if (/_roll/.test(object.name))
        {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else if (/_pitch/.test(object.name))
        {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else if (/_yaw/.test(object.name))
        {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else
        {
            this.not_axes.push(object);
        }

        if (object.children.length > 0)
        {
            _.each(object.children, (child: THREE.Object3D) =>
            {
                this.addRotationAxis(child);
            });
        }
    }

    addObject(object: THREE.Object3D): void
    {
        this.scene.add(object);
        this.addRotationAxis(object);
    }

    setScene(scene: THREE.Scene): void
    {
        this.scene.uuid = scene.uuid;
        this.scene.name = scene.name;

        while (scene.children.length > 0)
        {
            this.addObject(scene.children[0]);
        }
    }

    getAxisMap(): any
    {
        var axis_map = {};

        _.each(this.rotation_axes, (rotation_axis: THREE.Object3D, index: number) =>
        {
            axis_map[rotation_axis.name] = index;
        });

        return axis_map;
    }

    loadJSON(): void
    {
        $.ajax({
            url:"./assets/etc/plen2_3dmodel.json",
            success:(data)=>{
                var model_obj:any = data;

                if (model_obj.metadata.type.toLowerCase() === "object")
                {
                    var loader = new THREE.ObjectLoader();
                    var result = loader.parse(model_obj);

                    if (result instanceof THREE.Scene)
                    {
                        this.setScene(result);
                    }
                    else
                    {
                        this.addObject(result);
                    }
                    this.scope.E3DModelLoaded.next(0); // this.$rootScope.$broadcast("3DModelLoaded");
                }
            },
            error:(error) => {
                alert("Loading a 3D model failed. (Please refresh this page.)"+error);
            }
        })
    }
} 