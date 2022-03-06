import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'

@Component({
    selector: 'app-root',
    template: `
        <header>
            <h1>{{ title }}</h1>
        </header>
        <app-grid-generator></app-grid-generator>
        <footer>Version: 0.0.2</footer>
    `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'Simple CSS Grid Generator'

    constructor(private titleService: Title) {}

    ngOnInit() {
        this.titleService.setTitle(this.title)
    }
}
