import { useState } from "react"
import { INITIAL_GRADIENT } from "../constants/app"
import { detailsGradients } from "../services/app"

export function useGradient(){
    const [gradientColor, setGradientColor] = useState(INITIAL_GRADIENT)

    const changeGradient = (primary, secondary, switchColors = false) => {
        if(switchColors){
            setGradientColor({
                ...gradientColor,
                colorPrimary: secondary,
                colorSecondary: primary,
            })
        }else{
            setGradientColor({
                ...gradientColor,
                colorPrimary: primary,
                colorSecondary: secondary,
            })
        }
    }

    const changeTypeGradient = (type) => {
        if(type === 'linear-gradient'){
            setGradientColor({
                ...gradientColor,
                type,
                direction: 'to right'
            })
        }else if(type === 'radial-gradient'){
            setGradientColor({
                ...gradientColor,
                type,
                direction: 'circle'
            })
        }
    }

    const changePrimaryPercentageGradient = (primaryPercentage) => {
        setGradientColor({
            ...gradientColor,
            primaryPercentage
        })
    }

    const changeDirectionGradient = (direction) => {
        setGradientColor({
            ...gradientColor,
            direction
        })
    }

    const detailsGradient = () => {
        return detailsGradients(gradientColor)

    }
    
    return [gradientColor, changeGradient, changeTypeGradient, changeDirectionGradient, changePrimaryPercentageGradient, detailsGradient]
}