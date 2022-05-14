import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { combineLatest, Observable, Subject } from 'rxjs'
import { filter, map, startWith, takeUntil } from 'rxjs/operators'
import { FormOptions, GridForm, GridTemplateInfo } from '../app.types'
import {
    GRID_CONTROL_NAMES,
    GRID_FORM_START_WITH,
    GRID_TEMPLATE_COLUMN_CONTROL_NAMES,
    GRID_TEMPLATE_ROW_COLUMN_NAMES,
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
        const fbGridGroup = this.createFormGroup(GRID_CONTROL_NAMES)
        const fbTemplateColumnsGroup = this.createFormGroup(GRID_TEMPLATE_COLUMN_CONTROL_NAMES)
        const fbTemplateRowsGroup = this.createFormGroup(GRID_TEMPLATE_ROW_COLUMN_NAMES)

        this.form = this.fb.group({
            grid: this.fb.group(fbGridGroup),
            gridTemplateColumns: this.fb.group(fbTemplateColumnsGroup),
            gridTemplateRows: this.fb.group(fbTemplateRowsGroup),
        })
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

    createFormGroup(controlNames: FormOptions): { [key: string]: any } {
        return Object.keys(controlNames).reduce((acc, field) => {
            const option = controlNames[field]
            const { value, updateOn, validators, asyncValidators } = option
            const control = updateOn ? new FormControl(value, { updateOn, validators, asyncValidators }) : value
            acc[field] = control
            return acc
        }, {} as { [key: string]: any })
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
