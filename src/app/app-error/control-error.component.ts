import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'

@Component({
    template: `<p class="help is-danger" [class.hide]="shouldHide">{{ errorText }}</p>`,
    styles: [
        `
            .help {
                color: red;
                font-size: 0.75rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlErrorComponent {
    errorText: string
    shouldHide = true

    @Input() set text(value: string) {
        if (value !== this.errorText) {
            this.errorText = value
            this.shouldHide = !value
            this.cdr.detectChanges()
        }
    }

    constructor(private cdr: ChangeDetectorRef) {}
}
