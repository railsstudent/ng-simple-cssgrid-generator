import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppgridAutoRowsModule } from '../appgrid-auto-rows'
import { AppGridValueFieldModule } from '../appgrid-value-field'
import { ShareModule } from '../share.module'
import { AppgridFormComponent } from './appgrid-form.component'

@NgModule({
    declarations: [AppgridFormComponent],
    imports: [ShareModule, ReactiveFormsModule, AppGridValueFieldModule, AppgridAutoRowsModule],
    exports: [AppgridFormComponent],
})
export class AppGridFormModule {}
