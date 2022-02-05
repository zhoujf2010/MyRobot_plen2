import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
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
 

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

