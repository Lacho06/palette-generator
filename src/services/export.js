import convert from "color-convert"
import { HEXADECIMAL_PREFIX } from "../constants/app"

export const generateTailwindPalette = (color) => {
    const hslColor = convert.hex.hsl(color)
    const shadesColor = {}

    shadesColor['DEFAULT'] = color

    for(let i = 100; i <= 900; i += 100){
        if(i === 100){
            const initial = i - 50
            const initialSaturation = hslColor[1] - (initial / 10)
            const initialLightness = hslColor[2] - (initial / 100)
            const initialHexColor = convert.hsl.hex(hslColor[0], initialSaturation, initialLightness)
            shadesColor[initial] = `${HEXADECIMAL_PREFIX}${initialHexColor}`
        }
        const saturation = hslColor[1] - (i / 10)
        const lightness = hslColor[2] - (i / 100)
        const hexColor = convert.hsl.hex(hslColor[0], saturation, lightness)
        shadesColor[i] = `${HEXADECIMAL_PREFIX}${hexColor}`
    }
    return shadesColor
}