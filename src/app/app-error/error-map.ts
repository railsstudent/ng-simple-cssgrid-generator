import { InjectionToken } from '@angular/core'
import { MinError, MaxError } from './interfaces'

export const defaultErrors = {
    required: () => `This field is required`,
    min: ({ actual, min }: MinError) => `Min ${min} but got ${actual}`,
    max: ({ actual, max }: MaxError) => `Max ${max} but got ${actual}`,
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors,
})
