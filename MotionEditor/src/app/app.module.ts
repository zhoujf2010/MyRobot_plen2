import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TwitterButtonController } from './components/TwitterButton/controller';
import { OpenButtonController } from './components/OpenButton/controller';
import { SaveButtonController } from './components/SaveButton/controller';
import { ModelEditorPanelController } from './components/ModelEditorPanel/controller';
import { ModelEditorController } from './components/ModelEditor/controller';
import { NewButtonController } from './components/NewButton/controller';


import * as $ from 'jquery';

import {MotionModel} from './business_logic/MotionModel';
import {ModelLoader} from './business_logic/ModelLoader';
import {ThreeModel} from './business_logic/ThreeModel';
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
    NewButtonController
  ],
  imports: [
    BrowserModule
  ],
  providers: [MotionModel,
    ModelLoader,
    ThreeModel,
    Gscope
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
