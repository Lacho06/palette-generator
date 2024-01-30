import { HEXADECIMAL_PREFIX } from "../../constants/app";
import { detailsColor } from "../../services/app"
import convert from 'color-convert';
import '../../styles/index.css'

const ExportPDF = ({ palette, refElement }) => {
    const moreColors = palette.map(paletteItem => {return {color: palette.color, details: detailsColor(convert.hex.hsl(paletteItem.color))}})
    return (
        <div ref={refElement} className="w-full grid grid-cols-12 gap-4">
            {
                moreColors.map((moreColor, index) => {
                    const {details} = moreColor
                    const {lights, darks, saturates, adjacents} = details
                    return (
                        <div key={index} className={`col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4 ${index >= 3 ? '' : 'mb-8'}`}>
                            <div className="flex justify-evenly gap-4 w-full py-1 px-2 lg:px-0">
                                <div className='w-full gap-4 flex justify-center items-center outline outline-2 outline-[#9180C2] p-5 rounded-md'>
                                    <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-6 h-6" style={{ boxShadow: `0 20px 25px -5px ${palette[index].color}, 0 8px 10px -6px ${palette[index].color}`, background: palette[index].color }}></div>
                                    <p className="font-bold uppercase text-xs">{palette[index].color}</p>
                                </div>
                            </div>
                            <div className='grid grid-cols-12 gap-4 md:outline md:outline-2 md:outline-gray-200 py-5 px-2 rounded-md'>
                                <div className='flex flex-col gap-2 w-full col-span-6'>
                                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-[#9180C2] text-[#9180C2]'>Tints</h4>
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
                                    <h4 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-[#9180C2] text-[#9180C2]'>Shades</h4>
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
                                    <h3 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-[#9180C2] text-[#9180C2]'>Saturates</h3>
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
                                    <h3 className='w-full mb-3 font-bold text-sm py-1 text-center rounded-md outline outline-2 outline-[#9180C2] text-[#9180C2]'>Adjacents</h3>
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
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ExportPDF