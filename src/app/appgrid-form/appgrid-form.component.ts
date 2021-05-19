import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-grid-form',
    templateUrl: './appgrid-form.component.html',
    styleUrls: ['./appgrid-form.component.scss'],
})
export class AppgridFormComponent implements OnInit {
    @Input()
    formGroupName: string;

    form: FormGroup;

    gapUnits = ['px', '%', 'em'];
    gridAutoFlowChoices = ['row', 'column', 'dense', 'row dense', 'column dense'];

    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    }
}
