import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { AppErrorModule } from '../app-error'
import { AppGridValueFieldModule } from '../appgrid-value-field'
import { AppTemplateFormComponent } from './appgrid-template-form.component'

@NgModule({
    declarations: [AppTemplateFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        AppGridValueFieldModule,
        AppErrorModule,
    ],
    exports: [AppTemplateFormComponent],
})
export class AppTemplateFormModule {}
