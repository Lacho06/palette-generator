import { TYPES_TAILWIND_COLORS } from "../../constants/app"
import { generateTailwindPalette } from "../../services/export"
import { useEffect } from 'react';

const ExportTailwind = ({ palette, select, setDownload }) => {

    const paletteTailwind = palette.map((paletteItem) => {
        return generateTailwindPalette(paletteItem.color)
    })

    // ! No formatear esto, porque sino se desformatea el archivo q genera
    const contentToDownload = `
export const themeColors = {
    colors: {
        ${
        paletteTailwind.map((paletteTailwindItem, index) => {
        return (
        `${`'${TYPES_TAILWIND_COLORS[index]}': {`}
            ${`'DEFAULT': '${paletteTailwindItem['DEFAULT']}',`}
            ${
        Object.entries(paletteTailwindItem).map((paletteItem, i, array) => {
        if(paletteItem[0] !== 'DEFAULT'){
        if(paletteItem[0] === '50'){
        return `${`'${paletteItem[0]}': '${paletteItem[1]}',`}
        `    
        }
        if(paletteItem[0] === '900'){
        return `    ${`'${paletteItem[0]}': '${paletteItem[1]}',`}`    
        }else{
        return `    ${`'${paletteItem[0]}': '${paletteItem[1]}',`}
        `
        }
        }
        }).join("")
            }
        ${`},`}
        `
        )
        }).join("")
        }
    }
}`

    useEffect(() => {
        if(select === 'Tailwind'){
            setDownload(contentToDownload)
        }
    }, [select])

    return (
        <code>
            <div className="grid grid-cols-12 lg:gap-12">
                {
                    paletteTailwind.map((paletteTailwindItem, index) => {
                        return (
                            <div key={index} className="flex flex-col pt-1 pb-5 gap-2 lg:gap-4 col-span-12 lg:col-span-4">
                                <div className="flex justify-between items-center px-5 lg:px-0">
                                    <p>{`'${TYPES_TAILWIND_COLORS[index]}': {`}</p>
                                </div>
                                <div className="flex justify-between items-center px-5 lg:px-0">
                                    <p className="px-5">{`'DEFAULT': '${paletteTailwindItem['DEFAULT']}',`}</p>
                                    <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-4 h-4" style={{ boxShadow: `0 20px 25px -5px ${paletteTailwindItem['DEFAULT']}, 0 8px 10px -6px ${paletteTailwindItem['DEFAULT']}`, background: paletteTailwindItem['DEFAULT'] }}></div>
                                </div>
                                {
                                    Object.entries(paletteTailwindItem).map((paletteItem, i) => {
                                        if(paletteItem[0] !== 'DEFAULT'){
                                            return (
                                                <div key={i} className="flex justify-between items-center px-5 lg:px-0">
                                                    <p className="px-5">{`'${paletteItem[0]}': '${paletteItem[1]}',`}</p>
                                                    <div className="outline outline-2 outline-offset-2 outline-black rounded-full w-4 h-4" style={{ boxShadow: `0 20px 25px -5px ${paletteItem[1]}, 0 8px 10px -6px ${paletteItem[1]}`, background: paletteItem[1] }}></div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                                <p>{`},`}</p>
                            </div>
                        )
                    })
                }
            </div>
        </code>
    )
}

export default ExportTailwind