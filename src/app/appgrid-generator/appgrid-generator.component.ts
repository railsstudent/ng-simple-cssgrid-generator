import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith, takeUntil, tap } from 'rxjs/operators';
import { autoflow, gapUnits, GridForm, GridTemplateInfo } from '../types';

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit, OnDestroy {
    @ViewChild('grid', { static: true })
    grid: ElementRef;

    form: FormGroup;

    gridTemplateColumnsCss = '';
    gridTemplateRowsCss = '';
    openCurly = '{';
    closeCurly = '}';
    containerHeight = '';
    gridAutoFlow = '';
    gridGapCss = '';
    gapUnits = gapUnits;
    gridAutoFlowChoices = autoflow;

    numDivs$: Observable<number[]>;

    destroy$ = new Subject();

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            grid: this.fb.group({
                heightInPixel: new FormControl(60, { updateOn: 'blur' }),
                numDivs: new FormControl(4, { updateOn: 'blur' }),
                gridAutoFlow: 'row',
                gap: 0,
                gapUnit: 'px',
            }),
            gridTemplateColumns: this.fb.group({
                repeat: ['true'],
                numOfTimes: new FormControl(2, { updateOn: 'blur' }),
                minmax: ['true'],
                minWidth: new FormControl(10, { updateOn: 'blur' }),
                minUnit: ['px'],
                maxWidth: new FormControl(1, { updateOn: 'blur' }),
                maxUnit: ['fr'],
            }),
            gridTemplateRows: this.fb.group({
                repeat: ['true'],
                numOfTimes: new FormControl(2, { updateOn: 'blur' }),
                minmax: ['true'],
                minWidth: new FormControl(20, { updateOn: 'blur' }),
                minUnit: ['px'],
                maxWidth: new FormControl(1, { updateOn: 'blur' }),
                maxUnit: ['fr'],
            }),
        });

        const gridTemplateColumns$ = (this.gridTemplateColumns.valueChanges as Observable<GridTemplateInfo>).pipe(
            startWith({
                repeat: 'true',
                numOfTimes: 2,
                minmax: 'true',
                minWidth: 10,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as GridTemplateInfo),
            map(v => this.generateCss(v), takeUntil(this.destroy$)),
        );

        const gridTemplateRows$ = (this.gridTemplateRows.valueChanges as Observable<GridTemplateInfo>).pipe(
            startWith({
                repeat: 'true',
                numOfTimes: 2,
                minmax: 'true',
                minWidth: 20,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as GridTemplateInfo),
            map(v => this.generateCss(v), takeUntil(this.destroy$)),
        );

        const gridForm$ = (this.gridForm.valueChanges as Observable<GridForm>).pipe(
            startWith({
                heightInPixel: 60,
                numDivs: 4,
                gridAutoFlow: 'row',
                gap: 0,
                gapUnit: 'px',
            } as GridForm),
            filter(
                value =>
                    value.gap !== null &&
                    !!value.gridAutoFlow &&
                    value.heightInPixel != null &&
                    value.heightInPixel >= 60,
            ),
            map(value => {
                const { heightInPixel, gridAutoFlow, gap, gapUnit } = value;
                return {
                    containerHeight: `${heightInPixel}px`,
                    gridAutoFlow,
                    gridGap: `${gap}${gapUnit}`,
                };
            }),
            takeUntil(this.destroy$),
        );

        combineLatest([gridTemplateColumns$, gridTemplateRows$, gridForm$])
            .pipe(
                tap(([gridTemplateColumns, gridTemplateRows, gridForm]) => {
                    const { containerHeight, gridAutoFlow, gridGap } = gridForm;

                    this.gridTemplateColumnsCss = `${gridTemplateColumns};`;
                    this.gridTemplateRowsCss = `${gridTemplateRows};`;
                    this.containerHeight = `${containerHeight};`;
                    this.gridAutoFlow = `${gridAutoFlow};`;
                    this.gridGapCss = `${gridGap};`;

                    const style = this.grid.nativeElement.style;
                    style.setProperty('--containerHeight', containerHeight);
                    style.setProperty('--grid-template-columns', gridTemplateColumns);
                    style.setProperty('--grid-template-rows', gridTemplateRows);
                    style.setProperty('--grid-auto-flow', gridAutoFlow);
                    style.setProperty('--grid-gap', gridGap);
                }),
                takeUntil(this.destroy$),
            )
            .subscribe();

        this.numDivs$ = this.gridForm.get('numDivs').valueChanges.pipe(
            startWith(this.gridForm.get('numDivs').value),
            filter((v: number) => v && v > 0),
            map(v => {
                const range = [];
                for (let i = 0; i < v; i++) {
                    range.push(i + 1);
                }
                return range;
            }),
            takeUntil(this.destroy$),
        );
    }

    get gridTemplateColumns() {
        return this.form.get('gridTemplateColumns');
    }

    get gridTemplateRows() {
        return this.form.get('gridTemplateRows');
    }

    get gridForm() {
        return this.form.get('grid');
    }

    private generateCss(info: GridTemplateInfo) {
        const { repeat, numOfTimes, minmax, minWidth, minUnit, maxWidth, maxUnit } = info;
        let str = '';
        if (repeat === 'true') {
            str += `repeat(${numOfTimes},`;
        }

        if (minmax === 'true') {
            str += `minmax(`;
        }

        str += `${minWidth}${minUnit}`;

        if (minmax === 'true') {
            str += `, ${maxWidth}${maxUnit})`;
        }

        if (repeat === 'true') {
            str += ')';
        }
        return str;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
