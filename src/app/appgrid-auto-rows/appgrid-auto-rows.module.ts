import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppgridAutoRowsComponent } from './appgrid-auto-rows.component'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [AppgridAutoRowsComponent],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule],
    exports: [AppgridAutoRowsComponent],
})
export class AppgridAutoRowsModule {}
