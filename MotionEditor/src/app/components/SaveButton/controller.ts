import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';
import { Gscope } from '../../business_logic/Gscope';

@Component({
    selector: 'save-button',
    templateUrl: './view.html',
    styleUrls: []
})
export class SaveButtonController {
    disabled: boolean = false;

    constructor(
        public scope: Gscope,
        public motion: MotionModel,
        public plen_controll_server_service: PLENControlServerService
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
    }

    onClick(): void {
        this.plen_controll_server_service.savefile(this.motion.name + ".json", this.motion.saveJSON(), (data) => {
            alert(JSON.stringify(data));
        });
    }
}  