import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { AppgridAutoRowsModule } from '../appgrid-auto-rows'
import { AppGridValueFieldModule } from '../appgrid-value-field'
import { AppgridFormComponent } from './appgrid-form.component'

@NgModule({
    declarations: [AppgridFormComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AppGridValueFieldModule,
        AppgridAutoRowsModule,
    ],
    exports: [AppgridFormComponent],
})
export class AppGridFormModule {}
