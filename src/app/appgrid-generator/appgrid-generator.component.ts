import { ChangeDetectionStrategy, Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';

@Component({
    selector: 'app-grid-generator',
    templateUrl: './appgrid-generator.component.html',
    styleUrls: ['./appgrid-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppGridGeneratorComponent implements OnInit {
    @ViewChild('grid')
    grid: ElementRef;

    code = `{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
    }`;

    constructor(private renderer: Renderer) {}

    ngOnInit() {
        console.log(this.grid);

        this.renderer.setElementStyle(this.grid.nativeElement, 'grid-template-columns', 'repeat(3, 1fr)');
        this.renderer.setElementStyle(this.grid.nativeElement, 'grid-template-rows', 'repeat(2, 1fr)');
        this.renderer.setElementStyle(this.grid.nativeElement, 'grid-auto-flow', 'column');
    }
}
