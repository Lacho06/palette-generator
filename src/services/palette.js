import { generatePalette } from "./app"

// Funcion para inicializar el customHook usePalette
export const initialPalette = () => {
    const colors = generatePalette()
    const paletteItems = []
    colors.map((color, index) => {
        paletteItems.push({
            id: index+1,
            locked: false,
            color
        })
    })
    return paletteItems
}