import { Component, Input, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { FieldControlConfig, ListControlConfig } from '../app-grid-control.interface'

@Component({
    selector: 'app-appgrid-auto-rows',
    templateUrl: './appgrid-auto-rows.component.html',
    styles: [
        `
            :host {
                display: block;
            }

            mat-form-field {
                margin-right: 0.5rem;
            }
        `,
    ],
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
    isKeywordSelected$: Observable<boolean>

    ngOnInit(): void {
        this.formControl = this.formGroup.get(this.formFieldControlConfig.controlName) as FormControl
        this.unitFormControl = this.formGroup.get(this.unitControlConfig.controlName) as FormControl
        this.keywordFormControl = this.formGroup.get(this.keywordControlConfig.controlName) as FormControl

        this.isKeywordSelected$ = this.keywordFormControl.valueChanges.pipe(
            startWith(this.keywordFormControl.value),
            map((value) => typeof value === 'string' && value !== ''),
        )
    }
}
