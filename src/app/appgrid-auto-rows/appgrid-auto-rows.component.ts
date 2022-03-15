import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { FieldControlConfig, ListControlConfig } from '../app-grid-control.interface'

@Component({
    selector: 'app-appgrid-auto-rows',
    templateUrl: './appgrid-auto-rows.component.html',
    styleUrls: ['./appgrid-auto-rows.component.scss'],
})
export class AppgridAutoRowsComponent implements OnInit {
    @Input()
    formGroup: FormGroup

    @Input()
    formFieldControlConfig: FieldControlConfig

    @Input()
    unitControlConfig: ListControlConfig<string>

    @Input()
    keywordControlConfig: ListControlConfig<string>

    formControl: FormControl
    unitFormControl: FormControl
    keywordFormControl: FormControl

    ngOnInit(): void {
        this.formControl = this.formGroup.get(this.formFieldControlConfig.controlName) as FormControl
        this.unitFormControl = this.formGroup.get(this.unitControlConfig.controlName) as FormControl
        this.keywordFormControl = this.formGroup.get(this.keywordControlConfig.controlName) as FormControl
    }
}
