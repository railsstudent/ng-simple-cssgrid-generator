import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ShareModule } from '../share.module'
import { AppTemplateFormComponent } from './appgrid-template-form.component'

@NgModule({
  declarations: [AppTemplateFormComponent],
  imports: [ShareModule, ReactiveFormsModule],
  exports: [AppTemplateFormComponent],
})
export class AppTemplateFormModule {}
