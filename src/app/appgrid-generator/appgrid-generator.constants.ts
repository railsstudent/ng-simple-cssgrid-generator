import { ControlMapping, GridForm, GridTemplateInfo } from '../app.types'

export const GRID_CONTROL_NAMES: ControlMapping = {
    heightInPixel: {
        value: 60,
        updateOn: 'blur',
    },
    numDivs: {
        value: 4,
        updateOn: 'blur',
    },
    gridAutoFlow: {
        value: 'row',
    },
    numGapLengths: {
        value: 1,
    },
    gap: {
        value: 0,
        updateOn: 'blur',
    },
    gapUnit: {
        value: 'px',
    },
    gapCol: {
        value: 0,
        updateOn: 'blur',
    },
    gapColUnit: {
        value: 'px',
    },
}

const DEFAULT_PROPERTIES: ControlMapping = {
    repeat: {
        value: 'true',
    },
    numOfTimes: {
        value: 2,
        updateOn: 'blur',
    },
    minmax: {
        value: 'true',
    },
    minUnit: {
        value: 'px',
    },
    maxWidth: {
        value: 1,
        updateOn: 'blur',
    },
    maxUnit: {
        value: 'fr',
    },
}

export const GRID_TEMPLATE_COLUMN_CONTROL_NAMES: ControlMapping = {
    ...DEFAULT_PROPERTIES,
    minWidth: {
        value: 10,
        updateOn: 'blur',
    },
}

export const GRID_TEMPLATE_ROW_COLUMN_NAMES: ControlMapping = {
    ...DEFAULT_PROPERTIES,
    minWidth: {
        value: 20,
        updateOn: 'blur',
    },
}

export const TEMPLATE_COLUMNS_START_WITH: GridTemplateInfo = {
    repeat: 'true',
    numOfTimes: 2,
    minmax: 'true',
    minWidth: 10,
    minUnit: 'px',
    maxWidth: 1,
    maxUnit: 'fr',
}

export const TEMPLATE_ROWS_START_WITH: GridTemplateInfo = {
    repeat: 'true',
    numOfTimes: 2,
    minmax: 'true',
    minWidth: 20,
    minUnit: 'px',
    maxWidth: 1,
    maxUnit: 'fr',
}

export const GRID_FORM_START_WITH: GridForm = {
    heightInPixel: 60,
    numDivs: 4,
    gridAutoFlow: 'row',
    numGapLengths: 1,
    gap: 0,
    gapUnit: 'px',
    gapCol: 0,
    gapColUnit: 'px',
}
