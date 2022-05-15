import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'

@Component({
    template: `
        <div class="mat-form-field">
            <mat-error class="mat-error help" [class.hide]="shouldHide">{{ errorText }}</mat-error>
        </div>
    `,
    styles: [
        `
            .help {
                margin-top: calc(2 / 3 * 1em);
                font-size: 75%;
                margin-right: 0.75em;
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
