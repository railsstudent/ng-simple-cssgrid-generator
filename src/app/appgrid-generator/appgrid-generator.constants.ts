import { Validators } from '@angular/forms'
import { GridUnitsType, GridForm, GridTemplateInfo, FormOptions } from '../app.types'

export const GRID_FORM_START_WITH: GridForm = {
    heightInPixel: 150,
    numDivs: 20,
    gridAutoFlow: 'row',
    numGapLengths: 1,
    gap: 0,
    gapUnit: 'px',
    gapCol: 0,
    gapColUnit: 'px',
    gridAutoRowsKeyword: 'auto',
    gridAutoRowsField: 0,
    gridAutoRowsUnit: 'px',
}

export const GRID_CONTROL_NAMES: FormOptions = {
    heightInPixel: {
        value: GRID_FORM_START_WITH.heightInPixel,
        updateOn: 'blur',
    },
    numDivs: {
        value: GRID_FORM_START_WITH.numDivs,
        updateOn: 'blur',
    },
    gridAutoFlow: {
        value: GRID_FORM_START_WITH.gridAutoFlow,
    },
    numGapLengths: {
        value: GRID_FORM_START_WITH.numGapLengths,
    },
    gap: {
        value: GRID_FORM_START_WITH.gap,
        updateOn: 'blur',
        validators: Validators.min(0),
    },
    gapUnit: {
        value: GRID_FORM_START_WITH.gapUnit,
    },
    gapCol: {
        value: GRID_FORM_START_WITH.gapCol,
        updateOn: 'blur',
        validators: Validators.min(0),
    },
    gapColUnit: {
        value: GRID_FORM_START_WITH.gapColUnit,
    },
    gridAutoRowsKeyword: {
        value: GRID_FORM_START_WITH.gridAutoRowsKeyword,
    },
    gridAutoRowsField: {
        value: GRID_FORM_START_WITH.gridAutoRowsField,
        updateOn: 'blur',
    },
    gridAutoRowsUnit: {
        value: GRID_FORM_START_WITH.gridAutoRowsUnit,
    },
}

const DEFAULT_PROPERTIES: FormOptions = {
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

export const TEMPLATE_COLUMNS_START_WITH: GridTemplateInfo = {
    repeat: `${DEFAULT_PROPERTIES.repeat.value}`,
    numOfTimes: 5,
    minmax: `${DEFAULT_PROPERTIES.minmax.value}`,
    minWidth: 10,
    minUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.minUnit.value}`,
    maxWidth: +DEFAULT_PROPERTIES.maxWidth.value,
    maxUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.maxUnit.value}`,
}

export const GRID_TEMPLATE_COLUMN_CONTROL_NAMES: FormOptions = {
    ...DEFAULT_PROPERTIES,
    numOfTimes: {
        value: TEMPLATE_COLUMNS_START_WITH.numOfTimes,
        updateOn: 'blur',
    },
    minWidth: {
        value: TEMPLATE_COLUMNS_START_WITH.minWidth,
        updateOn: 'blur',
    },
}

export const TEMPLATE_ROWS_START_WITH: GridTemplateInfo = {
    repeat: `${DEFAULT_PROPERTIES.repeat.value}`,
    numOfTimes: +DEFAULT_PROPERTIES.numOfTimes.value,
    minmax: `${DEFAULT_PROPERTIES.minmax.value}`,
    minWidth: 20,
    minUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.minUnit.value}`,
    maxWidth: +DEFAULT_PROPERTIES.maxWidth.value,
    maxUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.maxUnit.value}`,
}

export const GRID_TEMPLATE_ROW_COLUMN_NAMES: FormOptions = {
    ...DEFAULT_PROPERTIES,
    minWidth: {
        value: TEMPLATE_ROWS_START_WITH.minWidth,
        updateOn: 'blur',
    },
}
