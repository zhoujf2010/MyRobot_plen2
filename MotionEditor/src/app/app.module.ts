import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { TwitterButtonController } from './components/TwitterButton/controller';

@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    TwitterButtonController
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
