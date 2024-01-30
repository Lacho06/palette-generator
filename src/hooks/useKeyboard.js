import { useEffect, useRef } from "react"

export function useKeyboard(element, action = () => {}){
    const isInput = useRef(false)

    const spaceClick = (e) => {
        if(e.code === 'KeyC'){
            if(!isInput.current){
                action()
            }
        }
    }

    const toggleIsInput = (value) => {
        isInput.current = value
    }

    useEffect(() => {
        // Poner a escuchar el evento de teclado
        window.addEventListener('keypress', spaceClick)

        return () => {
            // Cleanup
            window.removeEventListener('keypress', spaceClick)
        }
    }, [element])

    return [toggleIsInput]
}