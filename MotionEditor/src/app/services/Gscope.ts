
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class Gscope
{
    
    // FrameLoadevent = new Subject<number>();
    // FrameLoadFinishedevent = new Subject<any>();

    ComponentDisabled = new Subject<any>();
    ComponentEnabled = new Subject<any>();
    E3DModelReset  = new Subject<any>();
    E3DModelLoaded  = new Subject<any>();

    RefreshThumbnail  = new Subject<any>();
    FrameSave  = new Subject<any>();
    FrameLoad  = new Subject<number>();
    FrameLoadFinished = new Subject<any>();

    AnimationPlay =   new Subject<any>();
    AnimationStop =   new Subject<any>();
    AnimationNext =   new Subject<any>();
    AnimationPrevious =   new Subject<any>();

    angleChange  =   new Subject<any>();
    InstallFinished  =   new Subject<any>();


    RobotConnected = new Subject<any>();
    RobotDisConnected = new Subject<any>();

    ReadLoadData = new Subject<any>();
}