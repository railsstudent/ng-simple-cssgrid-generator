import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormGroup, FormGroupDirective } from '@angular/forms'
import { Subject } from 'rxjs'
import { map, startWith, takeUntil } from 'rxjs/operators'
import { GAP_UNITS, GRID_UNITS } from '../app.types'
import { CompositeFieldDropdownConfiguration } from '../appgrid-value-field'

@Component({
    selector: 'app-grid-template-form',
    templateUrl: './appgrid-template-form.component.html',
    styleUrls: ['./appgrid-template-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTemplateFormComponent implements OnInit, OnDestroy {
    @Input()
    legend: string

    @Input()
    formGroupName: string

    units = GRID_UNITS
    unitsWithoutFlex = GAP_UNITS

    form: FormGroup
    minWidthConfiguration: CompositeFieldDropdownConfiguration
    maxWidthConfiguration: CompositeFieldDropdownConfiguration
    unsubscribe$ = new Subject<void>()

    constructor(private rootFormGroup: FormGroupDirective, private cdr: ChangeDetectorRef) {}

    ngOnInit() {
        this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup

        this.minWidthConfiguration = {
            controlName: 'minWidth',
            placeholder: 'Min value',
            type: 'number',
            min: 0,
            unitControlName: 'minUnit',
            unitPlaceholder: 'Unit',
            list: [],
        }

        this.maxWidthConfiguration = {
            controlName: 'maxWidth',
            placeholder: 'Max value',
            type: 'number',
            min: 0,
            unitControlName: 'maxUnit',
            unitPlaceholder: 'Unit',
            list: this.units.map((unit) => ({ text: unit, value: unit })),
        }

        this.repeat.valueChanges.subscribe((repeat) => {
            if (repeat === 'false') {
                this.numOfTimes.setValue(1)
            }
        })

        this.minmax.valueChanges
            .pipe(
                startWith('true'),
                map((value) => (value === 'true' ? this.unitsWithoutFlex : this.units)),
                takeUntil(this.unsubscribe$),
            )
            .subscribe((unitList) => {
                const list = unitList.map((unit) => ({ text: unit, value: unit }))
                this.minWidthConfiguration = {
                    ...this.minWidthConfiguration,
                    list,
                }
                this.cdr.markForCheck()
            })
    }

    get minmax() {
        return this.form.get('minmax') as AbstractControl
    }

    get repeat() {
        return this.form.get('repeat') as AbstractControl
    }

    get numOfTimes() {
        return this.form.get('numOfTimes') as AbstractControl
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next()
        this.unsubscribe$.complete()
    }
}
