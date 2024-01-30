import { useState } from "react"
import { detailsColor, formatColor } from "../services/app"
import convert from 'color-convert'
import { INITIAL_VALUE_MODAL_SUGGEST } from "../constants/app"
import { useModal } from "./useModal"

export function useModalSuggest(){
    const [modalInfo, setModalInfo] = useState(INITIAL_VALUE_MODAL_SUGGEST)
    const [showModal, modalSuggestRef, openModal, closeModal] = useModal()

    const openModalColorSuggest = (color) => {
        const hslColor = formatColor(convert.hex.hsl(color), 'hsl')
        const rgbColor = formatColor(convert.hex.rgb(color), 'rgb')
        const labColor = formatColor(convert.hex.lab(color), 'lab')
        const details = detailsColor(convert.hex.hsl(color))
        setModalInfo({ color, hslColor, rgbColor, labColor, details })
        openModal()
    }
    
    
    return [modalInfo, modalSuggestRef, showModal, openModalColorSuggest, closeModal]
}