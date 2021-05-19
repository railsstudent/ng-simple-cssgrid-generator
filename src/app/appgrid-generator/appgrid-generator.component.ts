import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

interface IGridTemplateInfo {
    repeat: string;
    numOfTimes: number;
    minmax: string;
    minWidth: number;
    minUnit: 'fr' | 'px' | 'em' | '%';
    maxWidth: number;
    maxUnit: 'fr' | 'px' | 'em' | '%';
}

// interface IGridInfo {
//     heightInPixel: number;
//     numDivs: number;
//     gridAutoFlow: 'row' | 'column' | 'dense' | 'row dense' | 'column dense';
//     gap: number;
//     gapUnit: 'px' | 'em' | '%';
// }

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit {
    @ViewChild('grid', { static: true })
    grid: ElementRef;

    form: FormGroup;

    gridTemplateColumnsCss = '';
    gridTemplateRowsCss = '';
    units = ['fr', 'em', 'px'];
    openCurly = '{';
    closeCurly = '}';
    containerHeight = '';
    gridAutoFlow = '';
    gridGapCss = '';
    gapUnits = ['px', '%', 'em'];
    gridAutoFlowChoices = ['row', 'column', 'dense', 'row dense', 'column dense'];

    numDivs$: Observable<number[]>;

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

        const gridTemplateColumns$ = (this.gridTemplateColumns.valueChanges as Observable<IGridTemplateInfo>).pipe(
            startWith({
                repeat: 'true',
                numOfTimes: 2,
                minmax: 'true',
                minWidth: 10,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as IGridTemplateInfo),
            map(v => this.generateCss(v)),
        );

        const gridTemplateRows$ = (this.gridTemplateRows.valueChanges as Observable<IGridTemplateInfo>).pipe(
            startWith({
                repeat: 'true',
                numOfTimes: 2,
                minmax: 'true',
                minWidth: 20,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as IGridTemplateInfo),
            map(v => this.generateCss(v)),
        );

        const containerHeight$ = this.gridForm.get('heightInPixel').valueChanges.pipe(
            startWith(this.gridForm.get('heightInPixel').value),
            filter(v => v && v >= 60),
            map(v => `${v}px`),
        );

        const gridAutoFlow$ = this.gridForm.get('gridAutoFlow').valueChanges.pipe(
            startWith(this.gridForm.get('gridAutoFlow').value),
            filter(v => !!v),
        );

        const gap$ = combineLatest([
            this.gridForm.get('gap').valueChanges.pipe(
                startWith(this.gridForm.get('gap').value),
                filter(v => v != null),
            ),
            this.gridForm.get('gapUnit').valueChanges.pipe(startWith(this.gridForm.get('gapUnit').value)),
        ]).pipe(map(([gap, unit]) => `${gap}${unit}`));

        combineLatest([gridTemplateColumns$, gridTemplateRows$, containerHeight$, gridAutoFlow$, gap$])
            .pipe(
                tap(([gridTemplateColumns, gridTemplateRows, containerHeight, gridAutoFlow, gridGap]) => {
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

    private generateCss(info: IGridTemplateInfo) {
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
}
