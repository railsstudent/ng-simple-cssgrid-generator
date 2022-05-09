import { ComponentRef, Directive, Inject, OnDestroy, OnInit, Self, ViewContainerRef } from '@angular/core'
import { NgControl } from '@angular/forms'
import { Observable, Subscription } from 'rxjs'
import { ControlErrorComponent } from '../control-error.component'
import { FORM_ERRORS } from '../error-map'

@Directive({
    selector: '[formControl], [formControlName]',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
    subscription: Subscription
    submit$: Observable<Event>
    ref: ComponentRef<ControlErrorComponent>

    constructor(
        @Self() private control: NgControl,
        @Inject(FORM_ERRORS) private errors: Record<string, any>,
        private vcr: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        if (this.control && this.control.valueChanges) {
            this.subscription = this.control.valueChanges.subscribe(() => {
                const controlErrors = this.control.errors
                if (controlErrors) {
                    const firstKey = Object.keys(controlErrors)[0]
                    const errorFn = this.errors[firstKey]
                    const text = errorFn(controlErrors[firstKey])
                    this.setError(text)
                } else {
                    this.setError('')
                }
            })
        }
    }

    async setError(text: string) {
        if (!this.ref) {
            const component = await (await import('../control-error.component')).ControlErrorComponent
            this.ref = this.vcr.createComponent(component)
        }

        this.ref.instance.text = text
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
    }
}
