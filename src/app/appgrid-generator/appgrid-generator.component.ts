import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';

interface IGridInfo {
    repeat: string;
    numOfTimes: number;
    minmax: string;
    minWidth: number;
    minUnit: 'fr' | 'px' | 'em' | '%';
    maxWidth: number;
    maxUnit: 'fr' | 'px' | 'em' | '%';
}

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit {
    @ViewChild('grid')
    grid: ElementRef;

    form: FormGroup;

    code = 'display: grid';
    gridTemplateColumnsCss = '';
    gridTemplateRowsCss = '';
    units = ['fr', 'em', 'px'];
    openCurly = '{';
    closeCurly = '}';
    containerHeight = '';

    numDivs$: Observable<number[]>;

    constructor(private renderer: Renderer2, private fb: FormBuilder, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.form = this.fb.group({
            heightInPixel: 60,
            numDivs: 3,
            gridTemplateColumns: this.fb.group({
                repeat: ['false'],
                numOfTimes: new FormControl(1, { updateOn: 'blur' }),
                minmax: ['true'],
                minWidth: new FormControl(10, { updateOn: 'blur' }),
                minUnit: ['px'],
                maxWidth: new FormControl(1, { updateOn: 'blur' }),
                maxUnit: ['fr'],
            }),
            gridTemplateRows: this.fb.group({
                repeat: ['false'],
                numOfTimes: new FormControl(1, { updateOn: 'blur' }),
                minmax: ['true'],
                minWidth: new FormControl(10, { updateOn: 'blur' }),
                minUnit: ['px'],
                maxWidth: new FormControl(1, { updateOn: 'blur' }),
                maxUnit: ['fr'],
            }),
        });

        const gridTemplateColumns$ = (this.gridTemplateColumns.valueChanges as Observable<IGridInfo>).pipe(
            startWith({
                repeat: 'false',
                numOfTimes: 1,
                minmax: 'true',
                minWidth: 10,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as IGridInfo),
            map(v => this.generateCss(v)),
        );

        const gridTemplateRows$ = (this.gridTemplateRows.valueChanges as Observable<IGridInfo>).pipe(
            startWith({
                repeat: 'false',
                numOfTimes: 1,
                minmax: 'true',
                minWidth: 10,
                minUnit: 'px',
                maxWidth: 1,
                maxUnit: 'fr',
            } as IGridInfo),
            map(v => this.generateCss(v)),
        );

        const containerHeight$ = this.form.get('heightInPixel').valueChanges.pipe(
            startWith(60),
            filter(v => v && v >= 60),
        );

        combineLatest(gridTemplateColumns$, gridTemplateRows$, containerHeight$)
            .pipe(
                tap(([gridTemplateColumns, gridTemplateRows, containerHeight]) => {
                    this.code = 'display: grid';
                    this.gridTemplateColumnsCss = gridTemplateColumns;
                    this.gridTemplateRowsCss = gridTemplateRows;
                    this.containerHeight = containerHeight;

                    this.renderer.setStyle(this.grid.nativeElement, 'height', `${containerHeight}px`);

                    this.renderer.setStyle(
                        this.grid.nativeElement,
                        'grid-template-columns',
                        this.gridTemplateColumnsCss,
                    );
                    this.renderer.setStyle(this.grid.nativeElement, 'grid-template-rows', this.gridTemplateRowsCss);
                    this.cd.markForCheck();
                }),
            )
            .subscribe();

        this.numDivs$ = this.form.get('numDivs').valueChanges.pipe(
            startWith(3),
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

    private generateCss(info: IGridInfo) {
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
