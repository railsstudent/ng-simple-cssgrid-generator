import { ControlMapping, GridForm, GridTemplateInfo } from '../types';

export const gridControlNames: ControlMapping = {
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
    gap: {
        value: 0,
        updateOn: 'blur',
    },
    gapUnit: {
        value: 'px',
    },
};

const same: ControlMapping = {
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
};

export const gridTemplateColumnControlNames: ControlMapping = {
    ...same,
    minWidth: {
        value: 10,
        updateOn: 'blur',
    },
};

export const gridTemplateRowControlNames: ControlMapping = {
    ...same,
    minWidth: {
        value: 20,
        updateOn: 'blur',
    },
};

export const templateColumnsStartWith: GridTemplateInfo = {
    repeat: 'true',
    numOfTimes: 2,
    minmax: 'true',
    minWidth: 10,
    minUnit: 'px',
    maxWidth: 1,
    maxUnit: 'fr',
};

export const templateRowsStartWith: GridTemplateInfo = {
    repeat: 'true',
    numOfTimes: 2,
    minmax: 'true',
    minWidth: 20,
    minUnit: 'px',
    maxWidth: 1,
    maxUnit: 'fr',
};

export const gridFormStartWith: GridForm = {
    heightInPixel: 60,
    numDivs: 4,
    gridAutoFlow: 'row',
    gap: 0,
    gapUnit: 'px',
};
