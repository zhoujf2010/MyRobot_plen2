import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TwitterButtonController } from './components/TwitterButton/controller';
import { OpenButtonController } from './components/OpenButton/controller';
import { SaveButtonController } from './components/SaveButton/controller';
import * as $ from 'jquery';

import {MotionModel} from './business_logic/MotionModel';
import {ModelLoader} from './business_logic/ModelLoader';

// The application module's namespace definition.
var APP_NAME = "MotionEditor";

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    TwitterButtonController,
    OpenButtonController,
    SaveButtonController
  ],
  imports: [
    BrowserModule
  ],
  providers: [MotionModel,
    ModelLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
