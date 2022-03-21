import { Component } from '@angular/core';
import { MotionModel } from '../../business_logic/MotionModel';
import { ModelLoader } from '../../business_logic/ModelLoader';
import { Gscope } from '../../business_logic/Gscope';
import { PLENControlServerService } from '../../business_logic/PLENControlServerService';

@Component({
    selector: 'open-button',
    templateUrl: './view.html',
    styleUrls: ["./style.css"]
})
export class OpenButtonController {
    disabled: boolean = false;
    showmodel: boolean = false;
    filelst: any;

    constructor(
        public scope: Gscope,
        public motion: MotionModel,
        public model_loader: ModelLoader,
        public plen_controll_server_service: PLENControlServerService
    ) {
        scope.ComponentDisabled.subscribe((item) => { this.disabled = true; });
        scope.ComponentEnabled.subscribe((item) => { this.disabled = false; });
    }

    onClick(): void {
        this.showmodel = true;

        this.plen_controll_server_service.getList((data) => {
            this.filelst = data;
        });
    }

    closeModel(): void {
        this.showmodel = false;
    }

    openfile(file): void {
        this.plen_controll_server_service.openfile(file.value, (data) => {
            this.showmodel = false;

            this.motion.loadJSON(JSON.stringify(data), this.model_loader.getAxisMap());
            this.motion.name = file.value.replace(".json", "").replace(".JSON", "");
        });
    }
} 