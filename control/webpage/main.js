"use strict";
(self["webpackChunkMotionEditor"] = self["webpackChunkMotionEditor"] || []).push([["main"],{

/***/ 5041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _components_TwitterButton_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/TwitterButton/controller */ 6295);
/* harmony import */ var _components_OpenButton_controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/OpenButton/controller */ 1594);



class AppComponent {
    constructor() {
        this.title = 'MotionEditor';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 17, vars: 0, consts: [["id", "left_pain"], ["id", "logo"], ["href", "/playground/"], ["src", "./assets/img/logo.png", "width", "128", "height", "160", "alt", "logo"], ["id", "menu"], ["id", "social_icons"], [1, "button-group"], ["href", "./config"], ["id", "right_pain"], ["id", "indent_container"], ["id", "scrollable_container", "scrollable-container", "", "auto-resize", "", "auto-resize-layout", "$scrollable_container.layout", "auto-resize-onload", "true"]], template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "twitter-button");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "open-Button");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "a", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "\u914D\u7F6E");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [_components_TwitterButton_controller__WEBPACK_IMPORTED_MODULE_0__.TwitterButtonController, _components_OpenButton_controller__WEBPACK_IMPORTED_MODULE_1__.OpenButtonController], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 6747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 5041);
/* harmony import */ var _xyz_xyz_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xyz/xyz.component */ 5095);
/* harmony import */ var _components_TwitterButton_controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/TwitterButton/controller */ 6295);
/* harmony import */ var _components_OpenButton_controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/OpenButton/controller */ 1594);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);






// The application module's namespace definition.
var APP_NAME = "MotionEditor";
class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        _xyz_xyz_component__WEBPACK_IMPORTED_MODULE_1__.XyzComponent,
        _components_TwitterButton_controller__WEBPACK_IMPORTED_MODULE_2__.TwitterButtonController,
        _components_OpenButton_controller__WEBPACK_IMPORTED_MODULE_3__.OpenButtonController], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.BrowserModule] }); })();


/***/ }),

/***/ 9406:
/*!**********************************************!*\
  !*** ./src/app/business_logic/FrameModel.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrameModel": () => (/* binding */ FrameModel)
/* harmony export */ });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/// <reference path="./OutputDeviceModel.ts" />

class FrameModel {
    constructor(transition_time_ms, outputs, selected, image_uri) {
        this._transition_time_ms = transition_time_ms;
        this.outputs = outputs;
        this.selected = selected;
        this.image_uri = image_uri;
    }
    set transition_time_ms(value) {
        if (lodash__WEBPACK_IMPORTED_MODULE_0__.isString(value)) {
            this._transition_time_ms = lodash__WEBPACK_IMPORTED_MODULE_0__.parseInt(value);
        }
        if (lodash__WEBPACK_IMPORTED_MODULE_0__.isNumber(value)) {
            this._transition_time_ms = value;
        }
    }
    get transition_time_ms() {
        return this._transition_time_ms;
    }
    deepCopy(frame) {
        if (frame == undefined)
            return;
        this.transition_time_ms = frame.transition_time_ms;
        this.selected = frame.selected;
        this.image_uri = frame.image_uri;
        this.outputs = [];
        lodash__WEBPACK_IMPORTED_MODULE_0__.each(frame.outputs, (output) => {
            this.outputs.push(new OutputDeviceModel(output.device, output.value));
        });
    }
}


/***/ }),

/***/ 3282:
/*!***********************************************!*\
  !*** ./src/app/business_logic/ModelLoader.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ModelLoader": () => (/* binding */ ModelLoader)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ 2845);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);



class ModelLoader {
    constructor() {
        this.home_quaternions = [];
        this.rotation_axes = [];
        this.not_axes = [];
        // noop.
        this.scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();
    }
    addRotationAxis(object) {
        if (/roll$/.test(object.name)) {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else if (/pitch$/.test(object.name)) {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else if (/yaw$/.test(object.name)) {
            this.rotation_axes.push(object);
            this.home_quaternions.push(object.quaternion.clone());
        }
        else {
            this.not_axes.push(object);
        }
        if (object.children.length > 0) {
            lodash__WEBPACK_IMPORTED_MODULE_0__.each(object.children, (child) => {
                this.addRotationAxis(child);
            });
        }
    }
    addObject(object) {
        this.scene.add(object);
        this.addRotationAxis(object);
    }
    setScene(scene) {
        this.scene.uuid = scene.uuid;
        this.scene.name = scene.name;
        while (scene.children.length > 0) {
            this.addObject(scene.children[0]);
        }
    }
    getAxisMap() {
        var axis_map = {};
        lodash__WEBPACK_IMPORTED_MODULE_0__.each(this.rotation_axes, (rotation_axis, index) => {
            axis_map[rotation_axis.name] = index;
        });
        return axis_map;
    }
    loadJSON() {
        // this.$http.get("./assets/etc/plen2_3dmodel.min.json")
        //     .success((data) =>
        //     {
        //         var model_obj:any = data;
        //         if (model_obj.metadata.type.toLowerCase() === "object")
        //         {
        //             var loader = new THREE.ObjectLoader();
        //             var result = loader.parse(model_obj);
        //             if (result instanceof THREE.Scene)
        //             {
        //                 this.setScene(result);
        //             }
        //             else
        //             {
        //                 this.addObject(result);
        //             }
        //             this.$rootScope.$broadcast("3DModelLoaded");
        //         }
        //     })
        //     .error(() =>
        //     {
        //         alert("Loading a 3D model failed. (Please refresh this page.)");
        //     });
    }
}
ModelLoader.ɵfac = function ModelLoader_Factory(t) { return new (t || ModelLoader)(); };
ModelLoader.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: ModelLoader, factory: ModelLoader.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3195:
/*!***********************************************!*\
  !*** ./src/app/business_logic/MotionModel.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MotionModel": () => (/* binding */ MotionModel)
/* harmony export */ });
/* harmony import */ var _FrameModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FrameModel */ 9406);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ 2938);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ 5139);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_FrameFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/FrameFactory */ 6900);
/// <reference path="./CodeModel.ts" />
/// <reference path="./FrameModel.ts" />





class MotionModel {
    constructor(
    // public scope: ng.IScope,
    // public $rootScope: ng.IRootScopeService,
    frame_factory) {
        this.frame_factory = frame_factory;
        this.slot = 44;
        this.name = "Empty";
        this.codes = [];
        this.frames = [];
        this.frames.push(this.frame_factory.getFrame());
        jquery__WEBPACK_IMPORTED_MODULE_2__(window).on("beforeunload", () => {
            // rootScope.$broadcast("FrameSave", this.getSelectedFrameIndex());
            localStorage.setItem("motion", this.saveJSON());
        });
    }
    getSelectedFrameIndex() {
        return lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex(this.frames, (frame) => { return frame.selected; });
    }
    removeFrame(index) {
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
    addFrame(index) {
        if (this.frames.length >= MotionModel.MAX_FRAMES) {
            return;
        }
        var selected_frame = lodash__WEBPACK_IMPORTED_MODULE_1__.find(this.frames, (frame) => {
            return frame.selected;
        });
        var copy_index = lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex(this.frames, (frame) => { return frame.selected; });
        // this.$rootScope.$broadcast("FrameSave", copy_index);
        var insertion_frame = this.frame_factory.getFrame(false);
        insertion_frame.deepCopy(selected_frame);
        insertion_frame.selected = false;
        this.frames.splice(index, 0, insertion_frame);
        this.selectFrame(index, false);
    }
    selectFrame(index, old_save = true, broadcast_finished = true) {
        if (old_save) {
            var old_index = lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex(this.frames, (frame) => { return frame.selected; });
            // this.$rootScope.$broadcast("FrameSave", old_index);
        }
        lodash__WEBPACK_IMPORTED_MODULE_1__.each(this.frames, (frame) => { frame.selected = false; });
        this.frames[index].selected = true;
        // this.$rootScope.$broadcast("FrameLoad", index);
        // if (broadcast_finished)
        // {
        //     this.$rootScope.$broadcast("FrameLoadFinished");
        // }
    }
    selectNextFrame() {
        var index = lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex(this.frames, (frame) => { return frame.selected; });
        if ((index + 1) !== this.frames.length) {
            this.selectFrame(index + 1);
        }
    }
    selectPrevFrame() {
        var index = lodash__WEBPACK_IMPORTED_MODULE_1__.findIndex(this.frames, (frame) => { return frame.selected; });
        if (index !== 0) {
            this.selectFrame(index - 1);
        }
    }
    reset() {
        this.name = "Empty";
        this.slot = 44;
        this.codes = [];
        this.frames = [this.frame_factory.getFrame()];
        // this.$rootScope.$broadcast("FrameLoad", 0);
    }
    loadJSON(motion_json, axis_map) {
        try {
            var motion_obj = JSON.parse(motion_json);
            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(motion_obj.slot) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber(motion_obj.slot)) {
                throw "Bad format!";
            }
            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(motion_obj.name) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isString(motion_obj.name)) {
                throw "Bad format!";
            }
            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(motion_obj.codes) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isArray(motion_obj.codes)) {
                throw "Bad format!";
            }
            lodash__WEBPACK_IMPORTED_MODULE_1__.each(motion_obj.codes, (code) => {
                if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(code.method) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isString(code.method)) {
                    throw "Bad format!";
                }
                if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(code.arguments) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isArray(code.arguments)) {
                    throw "Bad format!";
                }
                else {
                    lodash__WEBPACK_IMPORTED_MODULE_1__.each(code.arguments, (argment) => {
                        if (!lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber(argment)) {
                            throw "Bad format!";
                        }
                    });
                }
            });
            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(motion_obj.frames) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isArray(motion_obj.frames)) {
                throw "Bad format!";
            }
            else {
                lodash__WEBPACK_IMPORTED_MODULE_1__.each(motion_obj.frames, (frame) => {
                    if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(frame.transition_time_ms) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber(frame.transition_time_ms)) {
                        throw "Bad format!";
                    }
                    if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(frame.outputs) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isArray(frame.outputs)) {
                        throw "Bad format!";
                    }
                    else {
                        lodash__WEBPACK_IMPORTED_MODULE_1__.each(frame.outputs, (output) => {
                            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(output.device) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isString(output.device)) {
                                throw "Bad format!";
                            }
                            if (lodash__WEBPACK_IMPORTED_MODULE_1__.isUndefined(output.value) || !lodash__WEBPACK_IMPORTED_MODULE_1__.isNumber(output.value)) {
                                throw "Bad format!";
                            }
                        });
                    }
                });
            }
            this.slot = motion_obj.slot;
            this.name = motion_obj.name;
            this.codes = [];
            lodash__WEBPACK_IMPORTED_MODULE_1__.each(motion_obj.codes, (code) => {
                var args = [];
                lodash__WEBPACK_IMPORTED_MODULE_1__.each(code.arguments, (argment) => {
                    args.push(argment);
                });
                this.codes.push(new CodeModel(code.method, args));
            });
            this.frames = [];
            lodash__WEBPACK_IMPORTED_MODULE_1__.each(motion_obj.frames, (frame) => {
                var outputs = [];
                lodash__WEBPACK_IMPORTED_MODULE_1__.each(frame.outputs, (output) => {
                    outputs[axis_map[output.device]] = new OutputDeviceModel(output.device, output.value);
                });
                this.frames.push(new _FrameModel__WEBPACK_IMPORTED_MODULE_0__.FrameModel(frame.transition_time_ms, outputs, false, ""));
            });
            this.selectFrame(0, false);
        }
        catch (exception) {
            alert("Loading a motion file failed. This file has invalid format.");
        }
    }
    saveJSON() {
        var motion_obj = {
            slot: this.slot,
            name: this.name,
            codes: this.codes,
            frames: []
        };
        lodash__WEBPACK_IMPORTED_MODULE_1__.each(this.frames, (frame) => {
            var pure_frame = {};
            pure_frame.transition_time_ms = frame._transition_time_ms;
            pure_frame.outputs = frame.outputs;
            lodash__WEBPACK_IMPORTED_MODULE_1__.each(pure_frame.outputs, (output) => {
                output.value = Math.round(output.value);
            });
            motion_obj.frames.push(pure_frame);
        });
        return JSON.stringify(motion_obj, null, "\t");
    }
}
MotionModel.MIN_FRAMES = 1;
MotionModel.MAX_FRAMES = 20;
MotionModel.$inject = [
    "$scope",
];
MotionModel.ɵfac = function MotionModel_Factory(t) { return new (t || MotionModel)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_FrameFactory__WEBPACK_IMPORTED_MODULE_3__.FrameFactory)); };
MotionModel.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: MotionModel, factory: MotionModel.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 1594:
/*!*****************************************************!*\
  !*** ./src/app/components/OpenButton/controller.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenButtonController": () => (/* binding */ OpenButtonController)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_EventService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/EventService */ 763);
/* harmony import */ var _business_logic_MotionModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../business_logic/MotionModel */ 3195);
/* harmony import */ var _business_logic_ModelLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../business_logic/ModelLoader */ 3282);




class OpenButtonController {
    constructor(
    // $scope: ng.IScope,
    event, motion, model_loader) {
        // $scope.$on("ComponentDisabled", () => { this.disabled = true; });
        // $scope.$on("ComponentEnabled", () => { this.disabled = false; });
        this.event = event;
        this.motion = motion;
        this.model_loader = model_loader;
        this.disabled = false;
        event.Subscribe("aa").subscribe((item) => { alert(item); });
    }
    onchange(event) {
        var reader = new FileReader();
        reader.onload = (event) => {
            this.event.Broadcast("aa", "xxx");
            alert(event.target.result);
            this.motion.loadJSON(event.target.result, this.model_loader.getAxisMap());
            // $scope.$ctrl.motion.loadJSON(event.target.result, model_loader.getAxisMap());
            // $scope.$apply();
        };
        reader.readAsText(event.target.files[0]);
    }
}
OpenButtonController.$inject = [
    "$scope",
    "SharedMotionService"
];
OpenButtonController.ɵfac = function OpenButtonController_Factory(t) { return new (t || OpenButtonController)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_EventService__WEBPACK_IMPORTED_MODULE_0__.EventService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_business_logic_MotionModel__WEBPACK_IMPORTED_MODULE_1__.MotionModel), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_business_logic_ModelLoader__WEBPACK_IMPORTED_MODULE_2__.ModelLoader)); };
OpenButtonController.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: OpenButtonController, selectors: [["open-Button"]], decls: 4, vars: 0, consts: [[1, "button-open"], ["type", "button", 1, "button-menu"], [1, "fa", "fa-fw", "fa-folder-open", "fa-4x"], ["type", "file", "ng-disabled", "$ctrl.disabled", "accept", ".json", "title", "Open a motion.", 1, "input-motion", 3, "change"]], template: function OpenButtonController_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function OpenButtonController_Template_input_change_3_listener($event) { return ctx.onchange($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ 6295:
/*!********************************************************!*\
  !*** ./src/app/components/TwitterButton/controller.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TwitterButtonController": () => (/* binding */ TwitterButtonController)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class TwitterButtonController {
    constructor() {
        this.ttitle = "aaa";
        this.href = "http://twitter.com/share?text=あなた好みにPLENを動かそう！「PLEN - Motion Editor for Web.」は、誰でも簡単にPLENのモーションを作成できるwebアプリです。&url=http://plen.jp/playground/motion-editor/&hashtags=PLEN";
    }
    onClick() {
        window.open(encodeURI(this.href), 'tweeter_window', 'width=650,height=470,menubar=no,toolbar=no,location=no,scrollbars=yes,sizable=yes');
    }
}
TwitterButtonController.$inject = ['$window'];
TwitterButtonController.ɵfac = function TwitterButtonController_Factory(t) { return new (t || TwitterButtonController)(); };
TwitterButtonController.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TwitterButtonController, selectors: [["twitter-button"]], decls: 4, vars: 0, consts: [[1, "fa-stack", "fa-lg", "button-social"], [3, "click"], [1, "fa", "fa-circle", "fa-stack-2x", "button-twitter"], [1, "fa", "fa-twitter", "fa-stack-1x", "fa-inverse"]], template: function TwitterButtonController_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TwitterButtonController_Template_a_click_1_listener() { return ctx.onClick(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "i", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "i", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, encapsulation: 2 });


/***/ }),

/***/ 763:
/*!******************************************!*\
  !*** ./src/app/services/EventService.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventService": () => (/* binding */ EventService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 833);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 745);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);


class KeyValuePair {
    construct(key, value) {
        this.key = key;
        this.value = value;
    }
}
class EventService {
    Broadcast(key, value) {
        var observable = new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable();
        observable.subscribe((a) => {
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.of)(value);
        });
        var v = new KeyValuePair();
        v.key = key;
        v.value = observable;
        this.subscriptions.push(v);
        // this.subscriptions.push(
        //     new KeyValuePair<Observable<T>>(
        //         // key, 
        //         // observable
        //     )
        // );
    }
    Subscribe(key) {
        var observable = this.subscriptions.find((sub) => {
            return sub.key == key;
        });
        if (observable == null)
            return new rxjs__WEBPACK_IMPORTED_MODULE_0__.Observable();
        return observable.value;
    }
}
EventService.ɵfac = function EventService_Factory(t) { return new (t || EventService)(); };
EventService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: EventService, factory: EventService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 6900:
/*!******************************************!*\
  !*** ./src/app/services/FrameFactory.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrameFactory": () => (/* binding */ FrameFactory)
/* harmony export */ });
/* harmony import */ var _business_logic_FrameModel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../business_logic/FrameModel */ 9406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _services_ImageStoreService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/ImageStoreService */ 8724);
/// <reference path="./ImageStoreService.ts" />
/// <reference path="../business_logic/FrameModel.ts" />



class FrameFactory {
    constructor(image_store_service) {
        this.image_store_service = image_store_service;
        // noop.
    }
    getFrame(selected = true) {
        return new _business_logic_FrameModel__WEBPACK_IMPORTED_MODULE_0__.FrameModel(500, [], selected, this.image_store_service.get());
    }
}
FrameFactory.$inject = [
    "ImageStoreService"
];
FrameFactory.ɵfac = function FrameFactory_Factory(t) { return new (t || FrameFactory)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_services_ImageStoreService__WEBPACK_IMPORTED_MODULE_1__.ImageStoreService)); };
FrameFactory.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: FrameFactory, factory: FrameFactory.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 8724:
/*!***********************************************!*\
  !*** ./src/app/services/ImageStoreService.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageStoreService": () => (/* binding */ ImageStoreService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class ImageStoreService {
    constructor() {
        this._image_canvas = document.createElement("canvas");
        this._image_canvas.width = 150;
        this._image_canvas.height = 150;
        this._context = this._image_canvas.getContext("2d");
    }
    set(image) {
        var sx, sy, sw, sh;
        if (image.width > image.height) {
            sy = 0;
            sw = image.height;
            sh = image.height;
            sx = (image.width - sw) / 2;
        }
        else {
            sx = 0;
            sw = image.width;
            sh = image.width;
            sy = (image.height - sh) / 2;
        }
        this._context.drawImage(image, sx, sy, sw, sh, 0, 0, 150, 150);
    }
    get() {
        return this._image_canvas.toDataURL();
    }
}
ImageStoreService.ɵfac = function ImageStoreService_Factory(t) { return new (t || ImageStoreService)(); };
ImageStoreService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ImageStoreService, factory: ImageStoreService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5095:
/*!**************************************!*\
  !*** ./src/app/xyz/xyz.component.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XyzComponent": () => (/* binding */ XyzComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 3184);

class XyzComponent {
    constructor() { }
    ngOnInit() {
    }
    onClickxx() {
        alert(1);
    }
}
XyzComponent.ɵfac = function XyzComponent_Factory(t) { return new (t || XyzComponent)(); };
XyzComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: XyzComponent, selectors: [["app-xyz"]], decls: 4, vars: 0, consts: [[3, "click"]], template: function XyzComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "xyz works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function XyzComponent_Template_button_click_2_listener() { return ctx.onClickxx(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "aaaxx\u6309\u94AE");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ4eXouY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ 2340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 4431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 318);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 3184);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 6747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 2340);




// import * as angular from 'angular';
// import {MotionModel} from './app/business_logic/MotionModel';
// The application module's namespace definition.
var APP_NAME = "MotionEditor";
// angular.module(APP_NAME, [])
//   .service("SharedMotionService",
//   [
//       "$rootScope",
//       "FrameFactory",
//       MotionModel
//   ])
if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.error(err));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map