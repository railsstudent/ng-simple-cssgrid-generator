import { ComponentRef, Directive, ElementRef, Inject, OnDestroy, OnInit, Optional, Self, ViewContainerRef } from '@angular/core'
import { NgControl } from '@angular/forms'
import { Subscription } from 'rxjs'
import { ControlErrorComponent } from '../control-error.component'
import { FORM_ERRORS } from '../error-map'
import { AppControlErrorContainerDirective } from './control-error-container.directive'

@Directive({
    selector: '[formControl], [formControlName]',
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
    subscription: Subscription
    ref: ComponentRef<ControlErrorComponent>
    container: ViewContainerRef

    constructor(
        @Self() private control: NgControl,
        @Inject(FORM_ERRORS) private errors: Record<string, any>,
        vcr: ViewContainerRef,
        @Optional() appControlErrorContainer: AppControlErrorContainerDirective,
        private el: ElementRef,
    ) {
        this.container = appControlErrorContainer ? appControlErrorContainer.vcr : vcr
        console.log(this.el.nativeElement)
    }

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
            const component = (await import('../control-error.component')).ControlErrorComponent
            this.ref = this.container.createComponent(component)
        }

        this.ref.instance.text = text
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe()
        }
        if (this.ref) {
            this.ref.destroy()
        }
    }
}
