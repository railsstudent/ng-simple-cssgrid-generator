import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit {
    @ViewChild('grid')
    grid: ElementRef;

    code = `{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }`;

    form: FormGroup;

    units = ['fr', 'em', 'px'];

    styles = {
        hide: false,
    };

    constructor(private renderer: Renderer2, private fb: FormBuilder) {}

    ngOnInit() {
        console.log(this.grid);

        this.form = this.fb.group({
            gridTemplateColumns: this.fb.group({
                repeat: ['false'],
                numOfTimes: [1],
                minmax: ['true'],
                minWidth: [1],
                minUnit: ['px'],
                maxWidth: [1],
                maxUnit: ['px'],
            }),
            gridTemplateRows: this.fb.group({
                repeat: ['false'],
                numOfTimes: [1],
                minmax: ['true'],
                minWidth: [1],
                minUnit: ['px'],
                maxWidth: [1],
                maxUnit: ['px'],
            }),
        });

        this.renderer.setStyle(this.grid.nativeElement, 'grid-template-columns', 'repeat(3, minmax(150px, 1fr))');
        this.renderer.setStyle(this.grid.nativeElement, 'grid-template-rows', 'repeat(2, 1fr)');
        this.renderer.setStyle(this.grid.nativeElement, 'grid-auto-flow', 'column');

        this.gridTemplateColumns.get('repeat').valueChanges.subscribe(repeat => {
            if (repeat === 'false') {
                this.gridTemplateColumns.get('numOfTimes').setValue(1);
            }
        });

        this.gridTemplateRows.get('repeat').valueChanges.subscribe(repeat => {
            if (repeat === 'false') {
                this.gridTemplateRows.get('numOfTimes').setValue(1);
            }
        });
    }

    get gridTemplateColumns() {
        return this.form.get('gridTemplateColumns');
    }

    get gridTemplateRows() {
        return this.form.get('gridTemplateRows');
    }
}
