import { NUM_GAP_LENGTHS, AUTO_FLOW, GAP_UNITS } from '../app.types'
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-grid-form',
    templateUrl: './appgrid-form.component.html',
    styles: [
        `
            :host {
                display: block;
            }

            mat-form-field {
                margin-right: 0.5rem;
            }

            app-grid-value-field {
                display: inline-block;
            }
        `,
    ],
})
export class AppgridFormComponent implements OnInit {
    @Input()
    formGroupName: string

    form: FormGroup

    gapUnits = GAP_UNITS
    gapColUnits = GAP_UNITS
    gridAutoFlowChoices = AUTO_FLOW
    gapLengths = NUM_GAP_LENGTHS

    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup
    }

    get numGapLengths() {
        return this.form.get('numGapLengths') as AbstractControl
    }
}
