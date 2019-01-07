import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share.module';
import { AppGridGeneratorComponent } from './appgrid-generator.component';

@NgModule({
    declarations: [AppGridGeneratorComponent],
    imports: [ShareModule, ReactiveFormsModule],
    exports: [AppGridGeneratorComponent],
})
export class AppGeneratorModule {}
