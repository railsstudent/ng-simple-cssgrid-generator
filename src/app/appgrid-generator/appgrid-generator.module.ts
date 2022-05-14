import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { AppGridFormModule } from '../appgrid-form'
import { AppTemplateFormModule } from '../appgrid-template-form'
import { AppGridGeneratorComponent } from './appgrid-generator.component'
import { GridCellContentPipe } from './grid-cell-content.pipe'

@NgModule({
    declarations: [AppGridGeneratorComponent, GridCellContentPipe],
    imports: [CommonModule, ReactiveFormsModule, AppTemplateFormModule, AppGridFormModule],
    exports: [AppGridGeneratorComponent],
})
export class AppGeneratorModule {}
