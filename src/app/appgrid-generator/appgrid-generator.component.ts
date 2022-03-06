import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { combineLatest, Observable, Subject } from 'rxjs'
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators'
import { AUTO_FLOW, ControlMapping, GAP_UNITS, GridForm, GridTemplateInfo } from '../types'
import {
  GRID_CONTROL_NAMES,
  GRID_FORM_START_WITH,
  GRID_TEMPLATE_COLUMN_CONTROL_NAMES,
  GRID_TEMPLATE_ROW_COLUMN_NAMES,
  TEMPLATE_COLUMNS_START_WITH,
  TEMPLATE_ROWS_START_WITH,
} from './constants'

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

  gridTemplateColumnsCss = ''
  gridTemplateRowsCss = ''
  openCurly = '{'
  closeCurly = '}'
  containerHeight = ''
  gridAutoFlow = ''
  gridGapCss = ''
  gapUnits = GAP_UNITS
  gridAutoFlowChoices = AUTO_FLOW

  numDivs$: Observable<number[]>

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

    combineLatest([gridTemplateColumns$, gridTemplateRows$, gridForm$])
      .pipe(
        tap(([gridTemplateColumns, gridTemplateRows, gridForm]) => {
          const { containerHeight, gridAutoFlow, gridGap } = gridForm

          this.gridTemplateColumnsCss = `${gridTemplateColumns};`
          this.gridTemplateRowsCss = `${gridTemplateRows};`
          this.containerHeight = `${containerHeight};`
          this.gridAutoFlow = `${gridAutoFlow};`
          this.gridGapCss = `${gridGap};`

          const style = this.grid.nativeElement.style
          style.setProperty('--containerHeight', containerHeight)
          style.setProperty('--grid-template-columns', gridTemplateColumns)
          style.setProperty('--grid-template-rows', gridTemplateRows)
          style.setProperty('--grid-auto-flow', gridAutoFlow)
          style.setProperty('--grid-gap', gridGap)
        }),
        takeUntil(this.destroy$),
      )
      .subscribe()

    this.numDivs$ = this.gridForm.get('numDivs').valueChanges.pipe(
      startWith(this.gridForm.get('numDivs').value),
      filter((v: number) => v && v > 0),
      map((v) => {
        const range = []
        for (let i = 0; i < v; i++) {
          range.push(i + 1)
        }
        return range
      }),
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
    return this.form.get('gridTemplateColumns')
  }

  get gridTemplateRows() {
    return this.form.get('gridTemplateRows')
  }

  get gridForm() {
    return this.form.get('grid')
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
