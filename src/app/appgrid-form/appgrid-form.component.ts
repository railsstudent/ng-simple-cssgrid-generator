import { FormGroup, FormGroupDirective } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'
import { AUTO_FLOW, GAP_UNITS } from '../types'

@Component({
    selector: 'app-grid-form',
    templateUrl: './appgrid-form.component.html',
    styleUrls: ['./appgrid-form.component.scss'],
})
export class AppgridFormComponent implements OnInit {
    @Input()
    formGroupName: string

    form: FormGroup

    gapUnits = GAP_UNITS
    gridAutoFlowChoices = AUTO_FLOW

    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
    }
}
