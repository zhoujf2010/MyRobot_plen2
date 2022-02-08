
import { Component, OnInit } from '@angular/core';
import {ThreeModel} from '../../business_logic/ThreeModel';

import {Gscope} from '../../services/Gscope';

@Component({
    selector: 'model-editor-panel',
    templateUrl: './view.html',
    styleUrls: []
  })
  export class ModelEditorPanelController
{
    disabled: boolean = false;

    private _three_model: ThreeModel;

    static $inject = [
        "$scope",
        "$rootScope",
        "SharedThreeService"
    ];

    constructor(
        public scope: Gscope,
        three_model: ThreeModel
    )
    {
        this._three_model = three_model;
        scope.ComponentDisabled.subscribe((item)=>{this.disabled = true;});
        scope.ComponentEnabled.subscribe((item)=>{this.disabled = false;});
    }

    onClick(id: number): void
    {
        switch (id)
        {
            case 0:
                this._three_model.reverse3DModel();

                break;

            case 1:
                this._three_model.copyRightToLeft();

                break;

            case 2:
                this._three_model.copyLeftToRight();

                break;

            case 3:
                this._three_model.orbit_controls.reset();

                break;

            case 4:
                this.scope.E3DModelReset.next(0);

                break;

            default:
                return;
        }

        this.scope.RefreshThumbnail.next(0);
    }
} 