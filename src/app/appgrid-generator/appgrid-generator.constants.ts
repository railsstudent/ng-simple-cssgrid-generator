import { Validators } from '@angular/forms'
import { GridUnitsType, GridForm, GridTemplateInfo, FormGroupConfiguration } from '../app.types'

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

const GRID_CONTROL_NAMES: FormGroupConfiguration = {
    heightInPixel: {
        initialValue: GRID_FORM_START_WITH.heightInPixel,
        updateOn: 'blur',
    },
    numDivs: {
        initialValue: GRID_FORM_START_WITH.numDivs,
        updateOn: 'blur',
    },
    gridAutoFlow: {
        initialValue: GRID_FORM_START_WITH.gridAutoFlow,
    },
    numGapLengths: {
        initialValue: GRID_FORM_START_WITH.numGapLengths,
    },
    gap: {
        initialValue: GRID_FORM_START_WITH.gap,
        updateOn: 'blur',
        validators: Validators.min(0),
    },
    gapUnit: {
        initialValue: GRID_FORM_START_WITH.gapUnit,
    },
    gapCol: {
        initialValue: GRID_FORM_START_WITH.gapCol,
        updateOn: 'blur',
        validators: Validators.min(0),
    },
    gapColUnit: {
        initialValue: GRID_FORM_START_WITH.gapColUnit,
    },
    gridAutoRowsKeyword: {
        initialValue: GRID_FORM_START_WITH.gridAutoRowsKeyword,
    },
    gridAutoRowsField: {
        initialValue: GRID_FORM_START_WITH.gridAutoRowsField,
        updateOn: 'blur',
    },
    gridAutoRowsUnit: {
        initialValue: GRID_FORM_START_WITH.gridAutoRowsUnit,
    },
}

const DEFAULT_PROPERTIES: FormGroupConfiguration = {
    repeat: {
        initialValue: 'true',
    },
    numOfTimes: {
        initialValue: 2,
        updateOn: 'blur',
    },
    minmax: {
        initialValue: 'true',
    },
    minUnit: {
        initialValue: 'px',
    },
    maxWidth: {
        initialValue: 1,
        updateOn: 'blur',
    },
    maxUnit: {
        initialValue: 'fr',
    },
}

export const TEMPLATE_COLUMNS_START_WITH: GridTemplateInfo = {
    repeat: `${DEFAULT_PROPERTIES.repeat.initialValue}`,
    numOfTimes: 5,
    minmax: `${DEFAULT_PROPERTIES.minmax.initialValue}`,
    minWidth: 10,
    minUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.minUnit.initialValue}`,
    maxWidth: +DEFAULT_PROPERTIES.maxWidth.initialValue,
    maxUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.maxUnit.initialValue}`,
}

const GRID_TEMPLATE_COLUMN_CONTROL_NAMES: FormGroupConfiguration = {
    ...DEFAULT_PROPERTIES,
    numOfTimes: {
        initialValue: TEMPLATE_COLUMNS_START_WITH.numOfTimes,
        updateOn: 'blur',
    },
    minWidth: {
        initialValue: TEMPLATE_COLUMNS_START_WITH.minWidth,
        updateOn: 'blur',
    },
}

export const TEMPLATE_ROWS_START_WITH: GridTemplateInfo = {
    repeat: `${DEFAULT_PROPERTIES.repeat.initialValue}`,
    numOfTimes: +DEFAULT_PROPERTIES.numOfTimes.initialValue,
    minmax: `${DEFAULT_PROPERTIES.minmax.initialValue}`,
    minWidth: 20,
    minUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.minUnit.initialValue}`,
    maxWidth: +DEFAULT_PROPERTIES.maxWidth.initialValue,
    maxUnit: <GridUnitsType>`${DEFAULT_PROPERTIES.maxUnit.initialValue}`,
}

const GRID_TEMPLATE_ROW_COLUMN_NAMES: FormGroupConfiguration = {
    ...DEFAULT_PROPERTIES,
    minWidth: {
        initialValue: TEMPLATE_ROWS_START_WITH.minWidth,
        updateOn: 'blur',
    },
}

export const FORM_CONFIGURATION: Record<string, FormGroupConfiguration> = {
    grid: GRID_CONTROL_NAMES,
    gridTemplateColumns: GRID_TEMPLATE_COLUMN_CONTROL_NAMES,
    gridTemplateRows: GRID_TEMPLATE_ROW_COLUMN_NAMES,
}
