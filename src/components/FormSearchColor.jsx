import { PaletteIcon, SearchIcon } from './../assets/icons/Icons';

import { INITIAL_VALUE_SEARCH } from "../constants/app"
import { searchColorCharacter } from "../services/app"
import { useState } from "react"

const FormSearchColor = ({ toggleIsInput, action = () => {}, openModalGradient = () => {} }) => {
    const [searchInput, setSearchInput] = useState(INITIAL_VALUE_SEARCH)

    const [validate, setValidate] = useState({
        message: '',
        isError: true
    })

    const { message, isError } = validate

    const handleChange = ({ target }) => {
        if(searchInput === INITIAL_VALUE_SEARCH){
            toggleIsInput(true)
        }
        const { value } = target
        if(value === ''){
            setValidate({ message: '', isError: true })
        }else if(value.charAt(0) !== '#'){
            setValidate({ message: 'Hexadecimal characters must be begining by #', isError: true })
        }else if(value.length !== 7){
            setValidate({ message: 'Hexadecimal length must be seven characters', isError: true })
        }else if(!value.slice(1, value.length).split('').every(i => searchColorCharacter(i))){
            setValidate({ message: 'Invalid hexadecimal characters', isError: true })
        }else{
            setValidate({ message: '', isError: false })
        }
        setSearchInput(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!validate.isError){
            setSearchInput(INITIAL_VALUE_SEARCH)
            toggleIsInput(false)
            action(searchInput)
        }
    }

    return (
        <form className="flex flex-col w-full items-center" onSubmit={handleSubmit}>
            <div className="flex w-full items-center gap-2">
                <button type='button' className="mr-auto" onClick={openModalGradient}>
                    <PaletteIcon />
                </button>
                <div className="lg:w-2/3 lg:mx-auto flex flex-col items-center text-gray-500 placeholder:text-gray-300 text-md lg:text-lg lg:font-bold">
                    <input className="bg-transparent outline-none" type="text" name="search" value={searchInput} onChange={handleChange} placeholder="Color hexadecimal code" />
                </div>
                <button type="submit" className="ml-auto">
                    <SearchIcon />
                </button>
            </div>
            {
                isError && (
                    <div className='flex w-full text-xs mt-auto justify-center text-[#FB8892]'>
                        <p>{message}</p>
                    </div>
                )
            }
        </form>
    )
}

export default FormSearchColor