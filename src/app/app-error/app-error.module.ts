import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppControlErrorContainerDirective, ControlErrorsDirective } from './directives'
import { ControlErrorComponent } from './control-error.component'
import { MatInputModule } from '@angular/material/input'

@NgModule({
    declarations: [ControlErrorsDirective, ControlErrorComponent, AppControlErrorContainerDirective],
    imports: [CommonModule, MatInputModule],
    exports: [ControlErrorsDirective, ControlErrorComponent, AppControlErrorContainerDirective],
})
export class AppErrorModule {}
