import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-root',
    template: `
        <header>
            <h1>{{ title }}</h1>
        </header>
        <app-grid-generator></app-grid-generator>
        <footer>Version: {{ appVersion }}</footer>
    `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Simple CSS Grid Generator'
    appVersion = environment.appVersion

    constructor(private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle(this.title)
    }
}
