import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridValueFieldComponent } from './appgrid-value-field.component'
import { ShareModule } from '../share.module'

@NgModule({
    declarations: [AppGridValueFieldComponent],
    imports: [ShareModule, ReactiveFormsModule],
    exports: [AppGridValueFieldComponent],
})
export class AppGridValueFieldModule {}
