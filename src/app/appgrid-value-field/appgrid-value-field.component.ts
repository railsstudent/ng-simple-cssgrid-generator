import { GRID_UNITS } from '../types'
import { FormControl, FormGroup } from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-grid-value-field',
    template: `
        <ng-container [formGroup]="formGroup">
            <mat-form-field>
                <input type="number" matInput [placeholder]="placeholder" [formControl]="formControl" />
            </mat-form-field>
            <mat-form-field>
                <mat-select [placeholder]="unitPlaceholder" [formControl]="unitFormControl">
                    <mat-option *ngFor="let unit of unitList" [value]="unit">
                        {{ unit }}
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
})
export class AppGridValueFieldComponent implements OnInit {
    @Input()
    controlName: string

    @Input()
    unitControlName: string

    @Input()
    placeholder: string

    @Input()
    unitPlaceholder: string

    @Input()
    unitList: typeof GRID_UNITS

    @Input()
    formGroup: FormGroup

    formControl: FormControl
    unitFormControl: FormControl

    ngOnInit() {
        this.formControl = this.formGroup.get(this.controlName) as FormControl
        this.unitFormControl = this.formGroup.get(this.unitControlName) as FormControl
    }
}
