import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppGeneratorFormModule } from '../appgrid-generator-form/appgrid-generator-form.module';
import { ShareModule } from '../share.module';
import { AppGridGeneratorComponent } from './appgrid-generator.component';

@NgModule({
    declarations: [AppGridGeneratorComponent],
    imports: [ShareModule, ReactiveFormsModule, AppGeneratorFormModule],
    exports: [AppGridGeneratorComponent],
})
export class AppGeneratorModule {}
