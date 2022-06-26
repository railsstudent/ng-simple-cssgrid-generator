import { FormControl, FormGroup } from '@angular/forms'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { CompositeFieldDropdownConfiguration } from './appgrid-value-field.interface'

@Component({
    selector: 'app-grid-value-field',
    template: `
        <ng-container [formGroup]="formGroup">
            <mat-form-field appControlErrorContainer>
                <input
                    matInput
                    [formControl]="formControl"
                    [type]="fieldConfiguration.type || 'number'"
                    [placeholder]="fieldConfiguration.placeholder"
                    [min]="fieldConfiguration.min ?? null"
                    [max]="fieldConfiguration.max ?? null"
                    [required]="fieldConfiguration.required || false"
                />
            </mat-form-field>
            <mat-form-field>
                <mat-select [placeholder]="fieldConfiguration.unitPlaceholder" [formControl]="unitFormControl">
                    <mat-option *ngFor="let item of fieldConfiguration.list" [value]="item.value">
                        {{ item.text }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        </ng-container>
    `,
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
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridValueFieldComponent implements OnInit {
    @Input()
    formGroup: FormGroup

    @Input()
    fieldConfiguration: CompositeFieldDropdownConfiguration

    formControl: FormControl
    unitFormControl: FormControl

    ngOnInit() {
        const { controlName, unitControlName } = this.fieldConfiguration
        this.formControl = this.formGroup.get(controlName) as FormControl
        this.unitFormControl = this.formGroup.get(unitControlName) as FormControl
    }
}
