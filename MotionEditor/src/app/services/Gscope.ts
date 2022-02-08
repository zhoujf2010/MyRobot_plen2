
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

}