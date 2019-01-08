import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    units = ['fr', 'em', 'px'];

    constructor() {}

    ngOnInit() {}
}
