import { useRef, useState } from "react"

export function useModal(){
    const [showModal, setShowModal] = useState(false)
    const modalRef = useRef(null)

    const openModal = () => {
        setShowModal(true)
        modalRef.current.showModal()
    }
    const closeModal = () => {
        setShowModal(false)
        modalRef.current.close()
    }

    return [showModal, modalRef, openModal, closeModal]
}