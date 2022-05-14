import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridFormModule } from '../appgrid-form'
import { AppTemplateFormModule } from '../appgrid-template-form'
import { AppGridGeneratorComponent } from './appgrid-generator.component'
import { AppGridCssPipe, AppGridCellContentPipe } from './pipes'

@NgModule({
    declarations: [AppGridGeneratorComponent, AppGridCellContentPipe, AppGridCssPipe],
    imports: [CommonModule, ReactiveFormsModule, AppTemplateFormModule, AppGridFormModule],
    exports: [AppGridGeneratorComponent],
})
export class AppGeneratorModule {}
