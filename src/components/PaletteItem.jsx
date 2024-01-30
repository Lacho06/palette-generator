import { ChangeColorIcon, CopyIcon, DetailsColorIcon, LockedIcon, UnlockedIcon } from './../assets/icons/Icons';

import { copyColor } from "../services/app"

const PaletteItem = ({ item, openModalSuggest, changeLocked, actionVariant, withoutOptions = false, className = "" }) => {
    const { color, locked } = item

    return (
        <div className={`${className} flex lg:flex-col justify-around lg:justify-center items-center py-4 lg:py-0 gap-4`}>
            <div className="flex flex-col gap-4 justify-between">
                <p className="font-bold uppercase text-md lg:text-xs text-center">{ color }</p>
                <div onClick={() => openModalSuggest(color)} className={`flex justify-center items-center cursor-pointer hover:outline hover:outline-2 hover:outline-black hover:outline-offset-2 rounded-full w-24 h-24 lg:mb-6`} style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
            </div>
            {
                !withoutOptions && (
                    <div className="flex flex-col items-center justify-end py-2 lg:py-0 h-full gap-8 lg:gap-4">
                        {/* Options */}
                        <div className="grid grid-cols-12 gap-2 place-items-center w-full">
                            {/* Bloquear color */}
                            <button className={`text-gray-400 col-span-6 flex justify-center items-center rounded-full ${locked && 'bg-[#463772]'} shadow-md shadow-gray-400 w-6 h-6`} onClick={changeLocked}>
                                {
                                    locked ? <UnlockedIcon width={20} height={20} /> : <LockedIcon width={20} height={20} />
                                }
                            </button>
                            {/* Copiar color */}
                            <button onClick={() => copyColor(color)} className="text-gray-400 col-span-6 flex justify-center items-center rounded-full shadow-md shadow-gray-400 w-6 h-6">
                                <CopyIcon width={20} height={20} />
                            </button>
                        </div>
                        <div className="grid grid-cols-12 gap-2 place-items-center w-full">
                            {/* Cambiar tonalidad del color */}
                            <button disabled={locked} onClick={() => actionVariant(item)} className="text-gray-400 col-span-6 flex justify-center items-center rounded-full shadow-md shadow-gray-400 w-6 h-6 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50">
                                <ChangeColorIcon width={20} height={20} />
                            </button>
                            {/* Obtener los demas formatos del color (hsl, rgb, lab) */}
                            <button onClick={() => openModalSuggest(color)} className="text-gray-400 col-span-6 flex justify-center items-center rounded-full shadow-md shadow-gray-400 w-6 h-6">
                                <DetailsColorIcon width={20} height={20} />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default PaletteItem