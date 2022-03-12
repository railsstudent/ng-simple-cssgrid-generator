import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppgridAutoRowsComponent } from './appgrid-auto-rows.component'
import { MatSelectModule } from '@angular/material/select'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
    declarations: [AppgridAutoRowsComponent],
    imports: [CommonModule, MatSelectModule, MatFormFieldModule],
    exports: [AppgridAutoRowsComponent],
})
export class AppgridAutoRowsModule {}
