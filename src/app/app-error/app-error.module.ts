import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ControlErrorsDirective } from './directives'
import { ControlErrorComponent } from './control-error.component'

@NgModule({
    declarations: [ControlErrorsDirective, ControlErrorComponent],
    imports: [CommonModule],
    exports: [ControlErrorsDirective, ControlErrorComponent],
})
export class AppErrorModule {}
