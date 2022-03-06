import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { AppGeneratorModule } from './appgrid-generator'
import { ShareModule } from './share.module'

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppGeneratorModule, BrowserAnimationsModule, ShareModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
