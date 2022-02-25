import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TwitterButtonController } from './components/TwitterButton/controller';
import { OpenButtonController } from './components/OpenButton/controller';
import { SaveButtonController } from './components/SaveButton/controller';
import { ModelEditorPanelController } from './components/ModelEditorPanel/controller';
import { ModelEditorController } from './components/ModelEditor/controller';
import { NewButtonController } from './components/NewButton/controller';
import { DiffAngleViewerController } from './components/DiffAngleViewer/controller';
import { FrameEditorController } from './components/FrameEditor/controller';
import { EditPropertiesButtonController } from './components/EditPropertiesButton/controller';
import { SyncButtonController } from './components/SyncButton/controller';
import { PlayPauseButtonController } from './components/PlayPauseButton/controller';
import { PreviousButtonController } from './components/PreviousButton/controller';
import { NextButtonController } from './components/NextButton/controller';


import * as $ from 'jquery';

import {MotionModel} from './business_logic/MotionModel';
import {ModelLoader} from './business_logic/ModelLoader';
import {ThreeModel} from './business_logic/ThreeModel';
import {AnimationHelper} from './business_logic/AnimationHelper';
import {Gscope} from './services/Gscope';


// The application module's namespace definition.
var APP_NAME = "MotionEditor";

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    TwitterButtonController,
    OpenButtonController,
    SaveButtonController,
    ModelEditorPanelController,
    ModelEditorController,
    NewButtonController,
    DiffAngleViewerController,
    FrameEditorController,
    EditPropertiesButtonController,
    SyncButtonController,
    PlayPauseButtonController,
    PreviousButtonController,
    NextButtonController
  ],
  imports: [
    BrowserModule,FormsModule 
  ],
  providers: [MotionModel,
    ModelLoader,
    ThreeModel,
    Gscope,
    AnimationHelper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
