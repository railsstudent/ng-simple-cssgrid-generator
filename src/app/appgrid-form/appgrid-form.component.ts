import { NUM_GAP_LENGTHS, AUTO_FLOW, GAP_UNITS, GRID_AUTO_ROWS_KEYWORDS, GRID_UNITS } from '../app.types'
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms'
import { Component, Input, OnDestroy, OnInit } from '@angular/core'
import { takeUntil, tap } from 'rxjs/operators'
import { Subject } from 'rxjs'
import { FieldControlConfig, ListControlConfig } from '../app-grid-control.interface'

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

            app-grid-value-field,
            app-appgrid-auto-rows {
                display: inline-block;
            }
        `,
    ],
})
export class AppgridFormComponent implements OnInit, OnDestroy {
    @Input()
    formGroupName: string

    form: FormGroup
    gridAutoRowsFieldConfig: FieldControlConfig
    gridAutoRowsUnitConfig: ListControlConfig<string>
    gridAutoRowsKeywordConfig: ListControlConfig<string>

    readonly gapUnits = GAP_UNITS
    readonly gapColUnits = GAP_UNITS
    readonly gridAutoFlowChoices = AUTO_FLOW
    readonly gapLengths = NUM_GAP_LENGTHS

    destroy$ = new Subject<boolean>()

    constructor(private rootFormGroup: FormGroupDirective) {}

    ngOnInit(): void {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup

        this.gridAutoRowsKeywordConfig = {
            controlName: 'gridAutoRowsKeyword',
            valueList: GRID_AUTO_ROWS_KEYWORDS,
            placeholder: 'Grid Auto Rows Keyword',
        }

        this.gridAutoRowsFieldConfig = {
            controlName: 'gridAutoRowsField',
            placeholder: 'Grid Auto Rows Field',
        }

        this.gridAutoRowsUnitConfig = {
            controlName: 'gridAutoRowsUnit',
            valueList: GRID_UNITS,
            placeholder: 'Grid Auto Rows Unit',
        }

        this.numGapLengths.valueChanges
            .pipe(
                tap((value) => {
                    const numLengths = value as number
                    if (numLengths === 1) {
                        this.gapCol.setValue(0)
                        this.gapColUnit.setValue('px')
                    }
                }),
                takeUntil(this.destroy$),
            )
            .subscribe()
    }

    get numGapLengths() {
        return this.form.get('numGapLengths') as AbstractControl
    }

    get gapCol() {
        return this.form.get('gapCol') as AbstractControl
    }

    get gapColUnit() {
        return this.form.get('gapColUnit') as AbstractControl
    }

    ngOnDestroy(): void {
        this.destroy$.next(true)
        this.destroy$.complete()
    }
}
