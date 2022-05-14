import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridValueFieldComponent } from './appgrid-value-field.component'
import { AppErrorModule } from '../app-error/app-error.module'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'

@NgModule({
    declarations: [AppGridValueFieldComponent],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, AppErrorModule],
    exports: [AppGridValueFieldComponent],
})
export class AppGridValueFieldModule {}
