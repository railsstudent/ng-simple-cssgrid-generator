export const AUTO_FLOW = ['row', 'column', 'dense', 'row dense', 'column dense'] as const
export type AutoFlowType = typeof AUTO_FLOW[number]

export const GRID_UNITS = ['fr', 'px', 'em', '%']
export type GridUnitsType = 'fr' | 'px' | 'em' | '%'

export const GAP_UNITS = ['px', '%', 'em']
export type GapUnitsType = 'px' | 'em' | '%'
export const NUM_GAP_LENGTHS = [1, 2]

export interface GridTemplateInfo {
    repeat: string
    numOfTimes: number
    minmax: string
    minWidth: number
    minUnit: GridUnitsType
    maxWidth: number
    maxUnit: GridUnitsType
}

export interface GridForm {
    heightInPixel: number
    numDivs: number
    gridAutoFlow: AutoFlowType
    numGapLengths: number
    gap: number
    gapUnit: GapUnitsType
    gapCol: number
    gapColUnit: GapUnitsType
}

export type ControlMapping = { [key: string]: { value: string | number; updateOn?: 'change' | 'blur' | 'submit' } }
