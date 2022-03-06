import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ShareModule } from '../share.module'
import { AppgridFormComponent } from './appgrid-form.component'

@NgModule({
  declarations: [AppgridFormComponent],
  imports: [ShareModule, ReactiveFormsModule],
  exports: [AppgridFormComponent],
})
export class AppGridFormModule {}
