import { useEffect, useState } from "react"

export function usePalette(initialPalette, generatePalette){
    const [palette, setPalette] = useState(initialPalette)

    useEffect(() => {
        setPalette(initialPalette)
    }, [])

    // Funcion para bloquear o desbloquear un color
    const changeLocked = (item) => {
        const newPalette = []
        let i = 0
        while(i < palette.length){
            if(palette[i].id === item.id && palette[i].color === item.color){
                newPalette.push({...item, locked: !item.locked})
            }else{
                newPalette.push(palette[i])
            }
            i++
        }
        setPalette(newPalette)
    }

    // Funcion para generar una nueva paleta
    const changePalette = () => {
        const colors = generatePalette()
        const newPaletteItems = []
        colors.map((color, index) => {
            if(!palette[index].locked){
                return newPaletteItems.push({
                    ...palette[index],
                    color
                })
            }else{
                return newPaletteItems.push(palette[index])
            }
        })
        setPalette(newPaletteItems)
    }

    const changeColor = (id, newColor) => {
        if(!palette.some(itemColor => itemColor.id === id))return
        const index = palette.findIndex(itemColor => itemColor.id === id)
        let newPalette = [...palette]
        newPalette[index].color = newColor
        setPalette(newPalette)
    }

    return [palette, changeLocked, changePalette, changeColor]
}