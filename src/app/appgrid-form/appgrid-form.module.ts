import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridValueFieldModule } from '../appgrid-value-field'
import { ShareModule } from '../share.module'
import { AppgridFormComponent } from './appgrid-form.component'

@NgModule({
    declarations: [AppgridFormComponent],
    imports: [ShareModule, ReactiveFormsModule, AppGridValueFieldModule],
    exports: [AppgridFormComponent],
})
export class AppGridFormModule {}
