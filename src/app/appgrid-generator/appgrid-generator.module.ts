import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppTemplateFormModule } from '../appgrid-template-form';
import { ShareModule } from '../share.module';
import { AppGridGeneratorComponent } from './appgrid-generator.component';

@NgModule({
    declarations: [AppGridGeneratorComponent],
    imports: [ShareModule, ReactiveFormsModule, AppTemplateFormModule],
    exports: [AppGridGeneratorComponent],
})
export class AppGeneratorModule {}
