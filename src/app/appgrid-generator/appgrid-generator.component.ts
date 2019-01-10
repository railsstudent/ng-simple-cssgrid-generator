import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

interface IGridInfo {
    repeat: string;
    numOfTimes: number;
    minmax: string;
    minWidth: number;
    minUnit: 'fr' | 'px' | 'em';
    maxWidth: number;
    maxUnit: 'fr' | 'px' | 'em';
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

    code = '';
    form: FormGroup;
    units = ['fr', 'em', 'px'];

    constructor(private renderer: Renderer2, private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
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

        this.renderer.setStyle(this.grid.nativeElement, 'grid-template-columns', 'repeat(3,250px');
        this.renderer.setStyle(this.grid.nativeElement, 'grid-template-rows', 'repeat(2, 1fr)');
        this.renderer.setStyle(this.grid.nativeElement, 'grid-auto-flow', 'column');

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
            map(v => this.generateTrack(v)),
            tap(v => console.log(v)),
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
            map(v => this.generateTrack(v)),
            tap(v => console.log(v)),
        );

        combineLatest(gridTemplateColumns$, gridTemplateRows$)
            .pipe(
                tap(([gridTemplateColumns, gridTemplateRows]) => {
                    this.code = `{
                        display: grid;
                        grid-template-columns: ${gridTemplateColumns};
                        grid-template-rows: ${gridTemplateRows};
                    }`;
                }),
            )
            .subscribe();
    }

    get gridTemplateColumns() {
        return this.form.get('gridTemplateColumns');
    }

    get gridTemplateRows() {
        return this.form.get('gridTemplateRows');
    }

    private generateTrack(info: IGridInfo) {
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
