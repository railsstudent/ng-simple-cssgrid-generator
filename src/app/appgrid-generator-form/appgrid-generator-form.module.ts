import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share.module';
import { AppGeneratorFormComponent } from './appgrid-generator-form.component';

@NgModule({
    declarations: [AppGeneratorFormComponent],
    imports: [ShareModule, ReactiveFormsModule],
    exports: [AppGeneratorFormComponent],
})
export class AppGeneratorFormModule {}
