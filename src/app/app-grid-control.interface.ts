export interface ListControlConfig<T extends string> {
    controlName: string
    valueList: T[]
    placeholder: string
}

export interface FieldControlConfig {
    controlName: string
    placeholder: string
    min?: number | string
}
