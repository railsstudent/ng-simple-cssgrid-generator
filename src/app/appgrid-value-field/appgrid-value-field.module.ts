import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { CommonModule } from '@angular/common'
import { AppErrorModule } from '../app-error'
import { AppGridValueFieldComponent } from './appgrid-value-field.component'

@NgModule({
    declarations: [AppGridValueFieldComponent],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, AppErrorModule],
    exports: [AppGridValueFieldComponent],
})
export class AppGridValueFieldModule {}
