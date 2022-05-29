import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'
import { ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { AppErrorModule } from '../app-error'
import { AppgridAutoRowsComponent } from './appgrid-auto-rows.component'
import { AppDisableControlDirective } from './app-disable-control.directive'

@NgModule({
    declarations: [AppgridAutoRowsComponent, AppDisableControlDirective],
    imports: [CommonModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, AppErrorModule],
    exports: [AppgridAutoRowsComponent],
})
export class AppgridAutoRowsModule {}
