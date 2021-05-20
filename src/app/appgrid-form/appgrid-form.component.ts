import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { autoflow, gapUnits } from '../types';

@Component({
    selector: 'app-grid-form',
    templateUrl: './appgrid-form.component.html',
    styleUrls: ['./appgrid-form.component.scss'],
})
export class AppgridFormComponent implements OnInit {
    @Input()
    formGroupName: string;

    form: FormGroup;

    gapUnits = gapUnits;
    gridAutoFlowChoices = autoflow;

    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
