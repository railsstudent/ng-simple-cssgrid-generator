export interface CompositeFieldDropdownConfiguration {
    controlName: string
    placeholder: string
    type: string
    min?: number | string
    max?: number | string
    unitControlName: string
    unitPlaceholder: string
    list: { value: string; text: string }[]
    required?: boolean
}
