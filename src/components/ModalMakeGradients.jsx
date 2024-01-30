import { CopyIcon, EditIcon } from './../assets/icons/Icons';

import { HEXADECIMAL_PREFIX } from "../constants/app"
import { SwitchIcon } from "../assets/icons/Icons"
import convert from "color-convert"
import { copyColor } from "../services/app"
import { useGradient } from "../hooks/useGradient"

const ModalMakeGradients = ({ modalGradientRef, showGradientModal, closeGradientModal }) => {
    const [gradientColor, changeGradient, changeTypeGradient, changeDirectionGradient, changePrimaryPercentageGradient, detailsGradient] = useGradient()
    const { colorPrimary, colorSecondary, type, direction, primaryPercentage } = gradientColor
    const { lights, darks, saturates, adjacents } = detailsGradient()

    const copyGradient = () => {
        copyColor(`${type}(${direction}, ${colorPrimary} ${primaryPercentage}%, ${colorSecondary})`)
    }

    return (
        <dialog ref={modalGradientRef} className={`${!showGradientModal ? 'hidden' : ''} min-h-80 flex flex-col gap-8 z-50 items-center bg-slate-100 shadow-xl shadow-gray-400 rounded-2xl`}>
            <div className="flex justify-center sticky top-0 bg-slate-100/90 w-full py-5 backdrop:blur-3xl">
                <h2 className='font-bold text-2xl'>Make gradients</h2>
            </div>
            <form className='grid grid-cols-12 gap-4 lg:gap-0 w-full px-2 lg:px-8'>
                <div className='flex flex-col col-span-5 items-center justify-center gap-2'>
                    <div className="rounded-full w-8 h-8 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 20px 25px -5px ${colorPrimary}, 0 8px 10px -6px ${colorPrimary}`, background: colorPrimary }}></div>
                    <p className="font-bold uppercase">{colorPrimary}</p>
                    <label className="relative mt-auto font-bold flex items-center gap-1 text-sm py-1 lg:px-2 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#90EF48] hover:text-[#90EF48]">
                        Select color 
                        <EditIcon width={20} height={20} />
                        <input type="color" name="colorPrimary" value={colorPrimary} onChange={ ({ target }) => changeGradient(target.value, colorSecondary) } />
                    </label>
                </div>
                <div className='flex flex-col col-span-2 items-center justify-center gap-4'>
                    <button type='button' onClick={() => changeGradient(colorPrimary, colorSecondary, true)} className='font-bold p-1 md:p-4 lg:p-6 text-center rounded-full outline outline-2 outline-gray-200 hover:outline-[#90EF48] hover:text-[#90EF48]'>
                        <SwitchIcon width={20} height={20} />
                    </button>
                </div>
                <div className='flex flex-col col-span-5 items-center justify-center gap-2'>
                    <div className="rounded-full w-8 h-8 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 20px 25px -5px ${colorSecondary}, 0 8px 10px -6px ${colorSecondary}`, background: colorSecondary }}></div>
                    <p className="font-bold uppercase">{colorSecondary}</p>
                    <label className="relative mt-auto font-bold flex items-center gap-1 text-sm py-1 lg:px-2 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#90EF48] hover:text-[#90EF48]">
                        Select color 
                        <EditIcon width={20} height={20} />
                        <input type="color" name="colorSecondary" value={colorSecondary} onChange={ ({ target }) => changeGradient(colorPrimary, target.value) } />
                    </label>
                </div>
                <div className="col-span-12 flex flex-col lg:flex-row lg:justify-evenly gap-4 lg:gap-2 mt-6">
                    <select name="type" onChange={({ target }) => { changeTypeGradient(target.value) }} className="bg-white outline outline-1 outline-gray-200 hover:outline-gray-400 p-1 rounded-md">
                        <option value="linear-gradient" defaultChecked>Linear</option>
                        <option value="radial-gradient">Radial</option>
                    </select>
                    <label className="flex items-center gap-2 font-bold">
                        <input type="range" name="primaryPercentage" defaultValue={50} min={0} max={100} onChange={({target}) => { changePrimaryPercentageGradient(target.value)}} className="w-full lg:w-auto outline outline-1 outline-gray-200 hover:outline-gray-400 p-1 rounded-md accent-[#AFA2D2]" />
                        { primaryPercentage }%
                    </label>
                    <select name="direction" onChange={({ target }) => changeDirectionGradient(target.value)} className="bg-white outline outline-1 outline-gray-200 hover:outline-gray-400 p-1 rounded-md">
                        {
                            type === 'linear-gradient' && (
                                <>
                                    <option value="to right" defaultChecked>Right</option>
                                    <option value="to left">Left</option>
                                    <option value="to top">Top</option>
                                    <option value="to bottom">Bottom</option>
                                    <option value="to right top">Right top</option>
                                    <option value="to right bottom">Right bottom</option>
                                    <option value="to left top">Left top</option>
                                    <option value="to left bottom">Left bottom</option>
                                </>
                            )
                        }
                        {
                            type === 'radial-gradient' && (
                                <>
                                    <option value="circle" defaultChecked>Circle</option>
                                    <option value="ellipse">Ellipse</option>
                                </>
                            )
                        }
                    </select>
                </div>
            </form>
            <div className='w-full flex flex-col gap-4 px-8'>
                <h3 className='font-bold py-1 text-sm text-center outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2] rounded-md mb-3'>Gradient obtained</h3>
                <div className='w-48 h-48 relative outline outline-2 outline-gray-200 shadow-md mx-auto rounded-xl flex' style={{ background: `${type}(${direction}, ${colorPrimary} ${primaryPercentage}%, ${colorSecondary})`, boxShadow: `0 1px 2px 0 ${colorPrimary}, 0 1px 2px 0 ${colorSecondary}` }}>
                    <button onClick={copyGradient} className="flex justify-center items-center absolute top-0 right-0 mr-2 mt-2 rounded-full w-6 h-6 text-xs outline outline-1 hover:outline-white outline-[#463772]" style={{ background: 'rgba(255, 255, 255, .2)', backdropFilter: 'blur(40px)' }}>
                        <CopyIcon width={20} height={20} />
                    </button>
                    <div className='w-full h-14 mt-auto grid grid-cols-12 rounded-b-xl gap-1' style={{ background: 'rgba(255, 255, 255, .2)', backdropFilter: 'blur(40px)' }}>
                        <div className='col-span-4 flex flex-col items-center justify-center gap-2'>
                            <div className="rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 20px 25px -5px ${colorPrimary}, 0 8px 10px -6px ${colorPrimary}`, background: colorPrimary }}></div>
                        </div>
                        <div className='col-span-4 flex flex-col items-center justify-center gap-2'>
                            <i>➡</i>
                        </div>
                        <div className='col-span-4 flex flex-col items-center justify-center gap-2'>
                            <div className="rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 20px 25px -5px ${colorSecondary}, 0 8px 10px -6px ${colorSecondary}`, background: colorSecondary }}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full grid grid-cols-12 gap-4 px-8'>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Tints</h4>
                    <div className='w-full grid grid-cols-12 gap-2 mx-3 md:mx-0'>
                        {
                            lights.map((lightGradient, index) => {
                                const { colorPrimary, colorSecondary } = lightGradient
                                const primary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorPrimary)
                                const secondary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorSecondary)
                                return <div key={index} onClick={() => changeGradient(primary, secondary)} className="col-span-5 md:col-span-3 lg:col-span-2 cursor-pointer hover:scale-95 rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 1px 2px 0 ${primary}, 0 1px 2px 0 ${secondary}`, background: `${type}(${direction}, ${primary} ${primaryPercentage}%, ${secondary})` }}></div>
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Shades</h4>
                    <div className='w-full grid grid-cols-12 gap-2 mx-3 md:mx-0'>
                        {
                            darks.map((darkGradient, index) => {
                                const { colorPrimary, colorSecondary } = darkGradient
                                const primary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorPrimary)
                                const secondary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorSecondary)
                                return <div key={index} onClick={() => changeGradient(primary, secondary)} className="col-span-5 md:col-span-3 lg:col-span-2 cursor-pointer hover:scale-95 rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 1px 2px 0 ${primary}, 0 1px 2px 0 ${secondary}`, background: `${type}(${direction}, ${primary} ${primaryPercentage}%, ${secondary})` }}></div>
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Saturates</h4>
                    <div className='w-full grid grid-cols-12 gap-2 mx-3 md:mx-0'>
                        {
                            saturates.map((saturateGradient, index) => {
                                const { colorPrimary, colorSecondary } = saturateGradient
                                const primary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorPrimary)
                                const secondary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorSecondary)
                                return <div key={index} onClick={() => changeGradient(primary, secondary)} className="col-span-5 md:col-span-3 lg:col-span-2 cursor-pointer hover:scale-95 rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 1px 2px 0 ${primary}, 0 1px 2px 0 ${secondary}`, background: `${type}(${direction}, ${primary} ${primaryPercentage}%, ${secondary})` }}></div>
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Adjacents</h4>
                    <div className='w-full grid grid-cols-12 gap-2 mx-3 md:mx-0'>
                        {
                            adjacents.map((adjacentGradient, index) => {
                                const { colorPrimary, colorSecondary } = adjacentGradient
                                const primary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorPrimary)
                                const secondary = HEXADECIMAL_PREFIX+convert.hsl.hex(colorSecondary)
                                return <div key={index} onClick={() => changeGradient(primary, secondary)} className="col-span-5 md:col-span-3 lg:col-span-2 cursor-pointer hover:scale-95 rounded-full w-6 h-6 outline outline-1 outline-black outline-offset-2" style={{ boxShadow: `0 1px 2px 0 ${primary}, 0 1px 2px 0 ${secondary}`, background: `${type}(${direction}, ${primary} ${primaryPercentage}%, ${secondary})` }}></div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-8 sticky bottom-0 bg-slate-100/90 backdrop:blur-3xl w-full py-5'>
                <button onClick={closeGradientModal} className='hover:bg-red-200 font-bold text-sm py-2 px-6 hover:shadow-md hover:shadow-red-300 rounded-lg hover:outline hover:outline-1 hover:outline-red-600'>Close</button>
            </div>
        </dialog>
    )
}

export default ModalMakeGradients