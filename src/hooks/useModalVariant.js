import { useState } from "react"
import { INITIAL_PALETTE_ITEM } from "../constants/app"
import { useModal } from "./useModal"

export function useModalVariant(changeColor){
    const [showModalVariant, modalVariantRef, openModal, closeVariantModal] = useModal()
    const [item, setItem] = useState(INITIAL_PALETTE_ITEM)
    

    const openVariantModal = (item) => {
        setItem(item)
        openModal()
    }

    const submitAction = (id, colorPicker) => {
        changeColor(id, colorPicker)
        setItem({ ...item, color: colorPicker })
    }

    return [item, showModalVariant, modalVariantRef, openVariantModal, closeVariantModal, submitAction]
}