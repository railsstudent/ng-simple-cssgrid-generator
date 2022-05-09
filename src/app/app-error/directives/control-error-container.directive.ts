import { Directive, ViewContainerRef } from '@angular/core'

@Directive({
    selector: '[appControlErrorContainer]',
})
export class AppControlErrorContainerDirective {
    constructor(public vcr: ViewContainerRef) {}
}
