// * Constantes de la APP

export const VALUES_COLOR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']

export const HEXADECIMAL_PREFIX = '#'

export const TREND_PALETTES = [
    ['#170132', '#361542', '#573E54', '#85AE72', '#BCE1AB'],
    ['#43204A', '#7F1E47', '#422343', '#C22047', '#EA284B'],
    ['#383939', '#149C68', '#38C958', '#AEE637', '#FFFEDB'],
    ['#C36FC7', '#D288D5', '#E1A1E3', '#F0B9F1', '#FFD2FF'],
    ['#E7E79D', '#C0D890', '#78A890', '#606078', '#D8A878'],
    ['#941F1F', '#CE6B5D', '#FFEFB9', '#7B9971', '#34502B'],
]

export const INITIAL_VALUE_SEARCH = ''


export const INITIAL_VALUE_MODAL_SUGGEST = {
    color: '',
    hslColor: '',
    rgbColor: '',
    labColor: '',
    details: {
        lights: [],
        darks: [],
        saturates: [],
        adjacents: [],
    }
}

export const INITIAL_PALETTE_ITEM = {
    id: 0,
    color: '',
    isLocked: false
}

export const INITIAL_GRADIENT = {
    type: 'linear-gradient',
    direction: 'to right',
    colorPrimary: '#0A382B',
    primaryPercentage: 50,
    colorSecondary: '#DEF7F6'
}

export const TYPES_TAILWIND_COLORS = ['primary', 'darkPrimary', 'secondary', 'darkSecondary', 'accent']

export const TYPES_CSS_COLORS = ['primary', 'darkPrimary', 'secondary', 'darkSecondary', 'accent']