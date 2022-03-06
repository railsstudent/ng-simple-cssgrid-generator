export const autoflow = ['row', 'column', 'dense', 'row dense', 'column dense'] as const
export type autoflowType = typeof autoflow[number]

export const gridUnits = ['fr', 'px', 'em', '%'] as const
export type gridUnitsType = typeof gridUnits[number]

export const gapUnits = ['px', '%', 'em'] as const
export type gapUnitsType = typeof gapUnits[number]

export interface GridTemplateInfo {
  repeat: string
  numOfTimes: number
  minmax: string
  minWidth: number
  minUnit: gridUnitsType
  maxWidth: number
  maxUnit: gridUnitsType
}

export interface GridForm {
  heightInPixel: number
  numDivs: number
  gridAutoFlow: autoflowType
  gap: number
  gapUnit: gapUnitsType
}

export type ControlMapping = { [key: string]: { value: string | number; updateOn?: 'change' | 'blur' | 'submit' } }
