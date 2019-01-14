import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-grid-generator-form',
    templateUrl: './appgrid-generator-form.component.html',
    styleUrls: ['./appgrid-generator-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGeneratorFormComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    legend: string;

    units = ['em', 'fr', '%', 'px'];
    unitsWithoutFlex = ['em', '%', 'px'];

    minUnits$: Observable<string[]>;

    constructor() {}

    ngOnInit() {
        this.form.get('repeat').valueChanges.subscribe(repeat => {
            if (repeat === 'false') {
                this.form.get('numOfTimes').setValue(1);
            }
        });

        this.minUnits$ = this.minmax.valueChanges.pipe(
            startWith('true'),
            map(value => {
                if (value === 'true') {
                    return this.unitsWithoutFlex;
                } else {
                    return this.units;
                }
            }),
        );
    }

    get minmax() {
        return this.form.get('minmax') as AbstractControl;
    }
}
