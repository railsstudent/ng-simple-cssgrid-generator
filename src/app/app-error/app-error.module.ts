import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppControlErrorContainerDirective, ControlErrorsDirective } from './directives'
import { ControlErrorComponent } from './control-error.component'

@NgModule({
    declarations: [ControlErrorsDirective, ControlErrorComponent, AppControlErrorContainerDirective],
    imports: [CommonModule],
    exports: [ControlErrorsDirective, ControlErrorComponent, AppControlErrorContainerDirective],
})
export class AppErrorModule {}
