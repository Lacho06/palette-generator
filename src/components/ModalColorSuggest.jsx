import convert from "color-convert"
import { HEXADECIMAL_PREFIX } from "../constants/app"

const ModalColorSuggest = ({ className = "", modalInfo, modalSuggestRef, closeModal, onClose = () => {} }) => {
    const { color, rgbColor, hslColor, labColor, details } = modalInfo
    const { lights, darks, saturates, adjacents } = details

    return (
        <dialog ref={modalSuggestRef} onClose={onClose} className={`${className} min-h-80 flex flex-col gap-8 items-center bg-slate-100 shadow-xl shadow-gray-400 rounded-2xl`}>
            <div className="flex justify-center sticky top-0 bg-slate-100/90 w-full py-5 backdrop:blur-3xl">
                <h2 className='font-bold text-2xl'>Colors Suggest</h2>
            </div>
            <div className='grid grid-cols-12 gap-4 px-8'>
                <div className='flex col-span-12 w-full items-center justify-around'>
                    <h3 className='font-bold'>Original color</h3>
                    <div className='flex gap-4 justify-center items-center'>
                        <div className="rounded-full outline outline-2 outline-offset-2 outline-black w-8 h-8" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                        <p className="font-bold uppercase">{color}</p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 col-span-12 w-full items-center justify-around mb-2'>
                    <h3 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Alternative codes</h3>
                    <div className='w-full flex flex-col md:flex-row gap-2 justify-evenly items-center'>
                        <div className='flex flex-col justify-center items-center'>
                            <h5 className='font-extrabold text-xs'>RGB</h5>
                            <p>{rgbColor}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h5 className='font-extrabold text-xs'>HSL</h5>
                            <p>{hslColor}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            <h5 className='font-extrabold text-xs'>LAB</h5>
                            <p>{labColor}</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Tints</h4>
                    <div className='w-full grid grid-cols-12 gap-2'>
                        {
                            lights.map((lightColor, index) => {
                                const color = HEXADECIMAL_PREFIX+convert.hsl.hex(lightColor)
                                return (
                                    <div key={index} className='col-span-6 gap-2 flex flex-col justify-center items-center'>
                                        <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-6 h-6" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                                        <p className="font-bold uppercase text-xs">{color}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full col-span-6'>
                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Shades</h4>
                    <div className='w-full grid grid-cols-12 gap-2'>
                        {
                            darks.map((darkColor, index) => {
                                const color = HEXADECIMAL_PREFIX+convert.hsl.hex(darkColor)
                                return (
                                    <div key={index} className='col-span-6 gap-2 flex flex-col justify-center items-center'>
                                        <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-6 h-6" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                                        <p className="font-bold uppercase text-xs">{color}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 col-span-12 w-full items-center justify-around mb-2'>
                    <h3 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Saturates</h3>
                    <div className='w-full grid grid-cols-12 gap-2'>
                        {
                            saturates.map((saturate, index) => {
                                const color = HEXADECIMAL_PREFIX+convert.hsl.hex(saturate)
                                return (
                                    <div key={index} className='col-span-3 gap-2 flex flex-col justify-center items-center'>
                                        <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-6 h-6" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                                        <p className="font-bold uppercase text-xs">{color}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-2 col-span-12 w-full items-center justify-around mb-2'>
                    <h3 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-gray-200 hover:outline-[#9180C2] hover:text-[#9180C2]'>Adjacents</h3>
                    <div className='w-full grid grid-cols-12 gap-2'>
                        {
                            adjacents.map((adjacent, index) => {
                                const color = HEXADECIMAL_PREFIX+convert.hsl.hex(adjacent)
                                return (
                                    <div key={index} className='col-span-3 gap-2 flex flex-col justify-center items-center'>
                                        <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-6 h-6" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
                                        <p className="font-bold uppercase text-xs">{color}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='flex justify-center gap-8 sticky bottom-0 bg-slate-100/90 backdrop:blur-3xl w-full py-5'>
                {/* ? MEJORABLE para una proxima version */}
                {/* <div className='flex gap-2'>
                    <button className='bg-green-200 font-bold text-sm p-2 shadow-md shadow-green-300 rounded-lg hover:outline hover:outline-1 hover:outline-green-600'>⬇ Export as:</button>
                    <select className='bg-transparent outline-none rounded-md hover:outline hover:outline-gray-200 hover:outline-2'>
                        <option>CSS</option>
                        <option>PDF</option>
                        <option>Tailwind</option>
                    </select>
                </div> */}
                <button onClick={closeModal ? closeModal : onClose} className='hover:bg-red-200 font-bold text-sm py-2 px-6 hover:shadow-md hover:shadow-red-300 rounded-lg hover:outline hover:outline-1 hover:outline-red-600'>Close</button>
            </div>
        </dialog>
    )
}

export default ModalColorSuggest