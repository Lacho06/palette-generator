import { EditIcon, SwitchIcon } from "../assets/icons/Icons"

import { useState } from "react"

const ModalChangeColor = ({ item, showModalVariant, modalVariantRef, closeVariantModal, submitAction }) => {
    const { id, color } = item
    const [colorPicker, setColorPicker] = useState(color ? color : '#000000')
    const [isChanged, setIsChanged] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        submitAction(id, colorPicker)
        setIsChanged(true)
    }

    return (
        <dialog ref={modalVariantRef} onClose={() => setIsChanged(false)} className={`${!showModalVariant ? 'hidden' : ''} min-h-80 flex flex-col gap-8 items-center bg-slate-100 shadow-xl shadow-gray-400 rounded-2xl`}>
            <div className="flex justify-center sticky top-0 bg-slate-100/90 w-full py-5 backdrop:blur-3xl">
                <h2 className='font-bold text-2xl'>Change Color</h2>
            </div>
            <form className='grid grid-cols-12 w-full px-2 md:px-4 lg:px-8' onSubmit={handleSubmit}>
                <div className='flex flex-col col-span-5 items-center gap-8 md:gap-6 lg:gap-4'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <div className="rounded-full w-8 h-8 outline outline-2 outline-offset-2 outline-black" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                        <p className="font-bold uppercase">{color}</p>
                    </div>
                    <h3 className='font-bold text-center mt-auto'>Original color</h3>
                </div>
                <div className='flex flex-col col-span-2 items-center justify-center'>
                    <button className='font-bold p-3 md:p-4 lg:p-6 text-center rounded-full outline outline-2 outline-gray-200 hover:outline-[#90EF48] hover:text-[#90EF48]'>
                        <SwitchIcon width={20} height={20} />
                    </button>
                </div>
                <div className='flex flex-col col-span-5 items-center gap-8 md:gap-6 lg:gap-4'>
                    <div className='flex flex-col items-center justify-center gap-2'>
                        <div className="rounded-full w-8 h-8 outline outline-2 outline-offset-2 outline-black" style={{ boxShadow: `0 20px 25px -5px ${colorPicker}, 0 8px 10px -6px ${colorPicker}`, background: colorPicker }}></div>
                        <p className="font-bold uppercase">{colorPicker}</p>
                    </div>
                    <label className="relative mt-auto font-bold flex items-center gap-1 text-xs md:text-sm py-1 px-2 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#90EF48] hover:text-[#90EF48]">
                        Select color 
                        <EditIcon width={20} height={20} />
                        <input type="color" name="newColor" value={colorPicker} onChange={ ({ target }) => setColorPicker(target.value) } />
                    </label>
                </div>
            </form>
            {
                isChanged && (
                    <div className="px-4 lg:px-8 w-full">
                        <div className='flex font-bold text-sm px-1 lg:px-8 py-2 rounded-md outline outline-2 outline-[#90EF48] text-[#90EF48]'>
                            <span className='mx-2'>✔</span>
                            <p>Color changed successfully</p>
                            <button className='ml-auto' onClick={() => setIsChanged(false)}>❎</button>
                        </div>
                    </div>
                )
            }
            <div className='flex justify-center gap-8 sticky bottom-0 bg-slate-100/90 backdrop:blur-3xl w-full py-5'>
                <button onClick={closeVariantModal} className='hover:bg-red-200 font-bold text-sm py-2 px-6 hover:shadow-md hover:shadow-red-300 rounded-lg hover:outline hover:outline-1 hover:outline-red-600'>Close</button>
            </div>
        </dialog>
    )
}

export default ModalChangeColor