import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppGeneratorModule } from './appgrid-generator/appgrid-generator.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppGeneratorModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
