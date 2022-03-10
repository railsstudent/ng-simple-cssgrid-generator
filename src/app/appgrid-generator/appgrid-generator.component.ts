import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { combineLatest, Observable, of, Subject } from 'rxjs'
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators'
import { ControlMapping, GridForm, GridTemplateInfo } from '../types'
import {
    GRID_CONTROL_NAMES,
    GRID_FORM_START_WITH,
    GRID_TEMPLATE_COLUMN_CONTROL_NAMES,
    GRID_TEMPLATE_ROW_COLUMN_NAMES,
    TEMPLATE_COLUMNS_START_WITH,
    TEMPLATE_ROWS_START_WITH,
} from './appgrid-generator.constants'

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit, OnDestroy {
    @ViewChild('grid', { static: true })
    grid: ElementRef

    form: FormGroup

    openCurly = '{'
    closeCurly = '}'

    numDivs$: Observable<number[]>
    css$: Observable<any>
    destroy$ = new Subject()

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
            filter((value) => value.gap !== null && !!value.gridAutoFlow && value.heightInPixel != null && value.heightInPixel >= 60),
            map((value) => {
                const { heightInPixel, gridAutoFlow, gap, gapUnit } = value
                return {
                    containerHeight: `${heightInPixel}px`,
                    gridAutoFlow,
                    gridGap: `${gap}${gapUnit}`,
                }
            }),
            takeUntil(this.destroy$),
        )

        const gridStyle$ = of(this.grid.nativeElement.style)

        this.css$ = combineLatest([gridTemplateColumns$, gridTemplateRows$, gridForm$, gridStyle$]).pipe(
            map(([gridTemplateColumns, gridTemplateRows, gridForm, gridStyle]) => {
                const { containerHeight, gridAutoFlow, gridGap } = gridForm
                return {
                    gridTemplateColumns,
                    gridTemplateRows,
                    containerHeight,
                    gridAutoFlow,
                    gridGap,
                    gridStyle,
                }
            }),
            tap(({ gridTemplateColumns, gridTemplateRows, containerHeight, gridAutoFlow, gridGap, gridStyle }) => {
                gridStyle.setProperty('--containerHeight', containerHeight)
                gridStyle.setProperty('--grid-template-columns', gridTemplateColumns)
                gridStyle.setProperty('--grid-template-rows', gridTemplateRows)
                gridStyle.setProperty('--grid-auto-flow', gridAutoFlow)
                gridStyle.setProperty('--grid-gap', gridGap)
            }),
            map(({ gridTemplateColumns, gridTemplateRows, containerHeight, gridAutoFlow, gridGap }) => {
                return {
                    gridTemplateColumns,
                    gridTemplateRows,
                    containerHeight,
                    gridAutoFlow,
                    gridGap,
                }
            }),
            takeUntil(this.destroy$),
        )

        this.numDivs$ = this.numOfDivs.valueChanges.pipe(
            startWith(this.numOfDivs.value as number),
            filter((v: number) => typeof v === 'number' && v > 0),
            map((numDivs) => Array.from({ length: numDivs }, (_, i) => i)),
            takeUntil(this.destroy$),
        )
    }

    createFormGroup(controlNames: ControlMapping): { [key: string]: any } {
        return Object.keys(controlNames).reduce((acc, field) => {
            const option = controlNames[field]
            const { value, updateOn } = option
            const control = updateOn ? new FormControl(value, { updateOn }) : value
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
