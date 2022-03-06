import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridValueFieldComponent } from '../appgrid-value-field'
import { ShareModule } from '../share.module'
import { AppTemplateFormComponent } from './appgrid-template-form.component'

@NgModule({
    declarations: [AppTemplateFormComponent, AppGridValueFieldComponent],
    imports: [ShareModule, ReactiveFormsModule],
    exports: [AppTemplateFormComponent],
})
export class AppTemplateFormModule {}
