import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridValueFieldComponent } from './appgrid-value-field.component'
import { AppErrorModule } from '../app-error/app-error.module'
import { ShareModule } from '../share.module'

@NgModule({
    declarations: [AppGridValueFieldComponent],
    imports: [ShareModule, ReactiveFormsModule, AppErrorModule],
    exports: [AppGridValueFieldComponent],
})
export class AppGridValueFieldModule {}
