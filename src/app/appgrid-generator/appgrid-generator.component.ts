import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { combineLatest, Observable, Subject } from 'rxjs'
import { filter, map, startWith, takeUntil } from 'rxjs/operators'
import { FormGroupConfiguration, GridForm, GridTemplateInfo } from '../app.types'
import {
    FORM_CONFIGURATION,
    GRID_FORM_START_WITH,
    TEMPLATE_COLUMNS_START_WITH,
    TEMPLATE_ROWS_START_WITH,
} from './appgrid-generator.constants'
import { CssVariables } from './appgrid-generator.interface'

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit, OnDestroy {
    form: FormGroup
    numDivs$: Observable<number[]>
    css$: Observable<CssVariables>
    numTemplateCells$: Observable<number>
    destroy$ = new Subject<void>()

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group(this.createForm(FORM_CONFIGURATION))
        this.css$ = this.createCssObservable()
        this.numDivs$ = this.numOfDivs.valueChanges.pipe(
            startWith(this.numOfDivs.value as number),
            filter((v: number) => typeof v === 'number' && v > 0),
            map((numDivs) => Array.from({ length: numDivs }, (_, i) => i)),
            takeUntil(this.destroy$),
        )

        this.numTemplateCells$ = combineLatest([
            this.gridTemplateColumns.valueChanges.pipe(startWith(this.gridTemplateColumns.value)),
            this.gridTemplateRows.valueChanges.pipe(startWith(this.gridTemplateRows.value)),
        ]).pipe(
            map(([column, row]) => {
                return column.numOfTimes * row.numOfTimes
            }),
        )
    }

    private validateGridForm(value: GridForm) {
        const { numGapLengths, gap, gapCol, heightInPixel, gridAutoFlow } = value
        return numGapLengths >= 1 && gap !== null && gapCol !== null && !!gridAutoFlow && heightInPixel != null && heightInPixel >= 60
    }

    private createCssObservable(): Observable<CssVariables> {
        const gridTemplateColumns$ = (this.gridTemplateColumns.valueChanges as Observable<GridTemplateInfo>).pipe(
            startWith(TEMPLATE_COLUMNS_START_WITH),
            map((v) => this.generateCss(v)),
            takeUntil(this.destroy$),
        )

        const gridTemplateRows$ = (this.gridTemplateRows.valueChanges as Observable<GridTemplateInfo>).pipe(
            startWith(TEMPLATE_ROWS_START_WITH),
            map((v) => this.generateCss(v)),
            takeUntil(this.destroy$),
        )

        const gridForm$ = (this.gridForm.valueChanges as Observable<GridForm>).pipe(
            startWith(GRID_FORM_START_WITH),
            filter((values) => this.gridForm.valid && this.validateGridForm(values)),
            map((values) => {
                const {
                    gridAutoFlow,
                    gap,
                    gapUnit,
                    numGapLengths,
                    gapCol,
                    gapColUnit,
                    gridAutoRowsKeyword,
                    gridAutoRowsField,
                    gridAutoRowsUnit,
                    heightInPixel,
                } = values
                const rowGap = `${gap}${gapUnit}`
                const columnGap = `${gapCol}${gapColUnit}`
                const gridAutoRows = gridAutoRowsKeyword !== '' ? gridAutoRowsKeyword : `${gridAutoRowsField}${gridAutoRowsUnit}`
                return {
                    containerHeight: `${heightInPixel}px`,
                    gridAutoFlow,
                    gridGap: numGapLengths <= 1 ? rowGap : `${rowGap} ${columnGap}`,
                    gridAutoRows,
                }
            }),
            takeUntil(this.destroy$),
        )

        return combineLatest([gridTemplateColumns$, gridTemplateRows$, gridForm$]).pipe(
            map(([gridTemplateColumns, gridTemplateRows, gridForm]) => {
                const { containerHeight, gridAutoFlow, gridGap, gridAutoRows } = gridForm
                return {
                    gridTemplateColumns,
                    gridTemplateRows,
                    containerHeight,
                    gridAutoFlow,
                    gridGap,
                    gridAutoRows,
                }
            }),
            map(({ gridTemplateColumns, gridTemplateRows, containerHeight, gridAutoFlow, gridGap, gridAutoRows }) => {
                return {
                    gridTemplateColumns,
                    gridTemplateRows,
                    containerHeight,
                    gridAutoFlow,
                    gridGap,
                    gridAutoRows,
                }
            }),
            takeUntil(this.destroy$),
        )
    }

    private createFormGroup(controlNames: FormGroupConfiguration): Record<string, FormControl> {
        return Object.keys(controlNames).reduce((acc, field) => {
            const option = controlNames[field]
            const { initialValue: value, updateOn, validators, asyncValidators } = option
            const control = updateOn
                ? new FormControl(value, { updateOn, validators, asyncValidators })
                : new FormControl(value, validators, asyncValidators)
            acc[field] = control
            return acc
        }, {} as Record<string, FormControl>)
    }

    private createForm(formConfiguration: Record<string, FormGroupConfiguration>) {
        return Object.keys(formConfiguration).reduce((acc: Record<string, FormGroup>, formGroupName) => {
            const formGroupConfiguration = formConfiguration[formGroupName]
            const formGroup = this.createFormGroup(formGroupConfiguration)
            acc[formGroupName] = this.fb.group(formGroup)
            return acc
        }, {})
    }

    get gridTemplateColumns() {
        return this.form.get('gridTemplateColumns') as AbstractControl
    }

    get gridTemplateRows() {
        return this.form.get('gridTemplateRows') as AbstractControl
    }

    get gridForm() {
        return this.form.get('grid') as AbstractControl
    }

    get gridGap() {
        return this.gridForm.get('gap') as AbstractControl
    }

    get gridColGap() {
        return this.gridForm.get('gapCol') as AbstractControl
    }

    get numOfDivs() {
        return this.gridForm.get('numDivs') as AbstractControl
    }

    private generateCss(info: GridTemplateInfo) {
        const { repeat, numOfTimes, minmax, minWidth, minUnit, maxWidth, maxUnit } = info
        let str = ''
        if (repeat === 'true') {
            str += `repeat(${numOfTimes},`
        }

        if (minmax === 'true') {
            str += `minmax(`
        }

        str += `${minWidth}${minUnit}`

        if (minmax === 'true') {
            str += `, ${maxWidth}${maxUnit})`
        }

        if (repeat === 'true') {
            str += ')'
        }
        return str
    }

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
