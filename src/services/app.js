// * Logica de la App

import convert from "color-convert";
import { HEXADECIMAL_PREFIX, VALUES_COLOR } from "../constants/app";

export const randomNumber = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1)) + min)
}

// Funcion para generar un color hexadecimal
export const generateColor = () => {
    const color = []
    let i = 0;
    while(i < 6){
        const number = randomNumber(0, 14)
        const index = Number.parseInt(number)
        color.push(VALUES_COLOR[index])
        i++
    }
    return HEXADECIMAL_PREFIX+color.join('')
}

export const generatePalette = () => {
    const palette = []
    let i = 0;
    while(i < 5){
        palette.push(generateColor())
        i++
    }
    return palette
}

export const formatColor = (color, type) => {
    if(type === 'hsl' || type === 'lab'){
        return `${type}(${color[0]}, ${color[1]}%, ${color[2]}%)`
    }
    return `${type}(${color[0]}, ${color[1]}, ${color[2]})`
}

// Funcion para obtener variedad de colores apartir de un color
export const detailsColor = (hslColor, incHue = 80) => {
    const h = hslColor[0]
    const s = hslColor[1]
    const l = hslColor[2]

    const lights = []
    const darks = []
    const saturates = []
    const adjacents = []

    // lights y saturates
    let increment = 10
    let incrementHue = 20
    for(let i = 0; i < 4; i++){
        const newL = (l+increment > 100) ? 100 : l+increment
        const newS = (s+increment > 100) ? 100 : s+increment
        const newH = (h+incrementHue > 360) ? 360 : h+incrementHue
        increment += 10
        incrementHue += incHue
        lights.push([h, s, newL])
        saturates.push([h, newS, newL])
        adjacents.push([newH, s, newL])
        if(newL === 100) break
    }

    saturates.reverse()
    adjacents.reverse()

    // darks y saturates
    let decrement = 10
    let decrementHue = 20
    for(let i = 0; i < 4; i++){
        const newL = (l-decrement < 0) ? 0 : l-decrement
        const newS = (s-decrement < 0) ? 0 : s-decrement
        const newH = (h-decrementHue < 0) ? 0 : h-decrementHue
        decrement += 10
        decrementHue += incHue
        darks.push([h, s, newL])
        saturates.push([h, newS, l])
        adjacents.push([newH, s, newL])
        if(newL === 0) break
    }

    return { lights: lights.reverse(), darks, saturates, adjacents }
}

// Funcion para obtener variedad de gradientes apartir de un gradiente
export const detailsGradients = (gradientColor) => {
    const { colorPrimary, colorSecondary } = gradientColor
    const detailsPrimary = detailsColor(convert.hex.hsl(colorPrimary), 20)
    const detailsSecondary = detailsColor(convert.hex.hsl(colorSecondary), 20)
    const { lights: lightsPrimary, darks: darksPrimary, saturates: saturatesPrimary, adjacents: adjacentsPrimary } = detailsPrimary
    const { lights: lightsSecondary, darks: darksSecondary, saturates: saturatesSecondary, adjacents: adjacentsSecondary } = detailsSecondary

    const gradients = {
        lights: [],
        darks: [],
        saturates: [],
        adjacents: [],
    }
    lightsPrimary.map(color => {
        gradients.lights.push({
            colorPrimary: color,
            colorSecondary: colorSecondary,
        })
    })
    darksPrimary.map(color => {
        gradients.darks.push({
            colorPrimary: color,
            colorSecondary: colorSecondary,
        })
    })
    saturatesPrimary.map(color => {
        gradients.saturates.push({
            colorPrimary: color,
            colorSecondary: colorSecondary,
        })
    })
    adjacentsPrimary.map(color => {
        gradients.adjacents.push({
            colorPrimary: color,
            colorSecondary: colorSecondary,
        })
    })
    lightsSecondary.map(color => {
        gradients.lights.push({
            colorPrimary: colorPrimary,
            colorSecondary: color,
        })
    })
    darksSecondary.map(color => {
        gradients.darks.push({
            colorPrimary: colorPrimary,
            colorSecondary: color,
        })
    })
    saturatesSecondary.map(color => {
        gradients.saturates.push({
            colorPrimary: colorPrimary,
            colorSecondary: color,
        })
    })
    adjacentsSecondary.map(color => {
        gradients.adjacents.push({
            colorPrimary: colorPrimary,
            colorSecondary: color,
        })
    })

    return gradients
}

export const copyColor = (color) => {
    navigator.clipboard.writeText(color).then()
}

export const searchColorCharacter = (colorChar) => {
    return VALUES_COLOR.some(value => value === colorChar.toUpperCase())
}