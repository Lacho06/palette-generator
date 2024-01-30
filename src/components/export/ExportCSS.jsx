import { TYPES_CSS_COLORS } from './../../constants/app'
import { useEffect } from 'react';

const ExportCSS = ({ palette, select, setDownload }) => {
    const generateCSSPalette = (type, color) => {
        return `--color-${type}: '${color}';`
    }
    const bgCSSPalette = (type) => {
        return `background-color: var(--color-${type});`
    }
    const colorCSSPalette = (type) => {
        return `color: var(--color-${type});`
    }
    const borderCSSPalette = (type) => {
        return `border-color: var(--color-${type});`
    }
    const outlineCSSPalette = (type) => {
        return `outline-color: var(--color-${type});`
    }

    let paletteCSS = []
    let bgCSS = []
    let colorCSS = []
    let borderCSS = []
    let outlineCSS = []

    palette.map((paletteItem, index) => {
        paletteCSS.push(generateCSSPalette(TYPES_CSS_COLORS[index], paletteItem.color))
        bgCSS.push(bgCSSPalette(TYPES_CSS_COLORS[index]))
        colorCSS.push(colorCSSPalette(TYPES_CSS_COLORS[index]))
        borderCSS.push(borderCSSPalette(TYPES_CSS_COLORS[index]))
        outlineCSS.push(outlineCSSPalette(TYPES_CSS_COLORS[index]))
    })
    
    // ! No formatear esto, porque sino se desformatea el archivo q genera
    const contentToDownload = `
:root{
${
paletteCSS.map((paletteCSSItem, index, array) => {
if(index === array.length-1){
return `    ${paletteCSSItem}`
}else{
return `    ${paletteCSSItem}
`
}
}).join('')
}
}

${
bgCSS.map((bgCSSItem, index) => {
return (
`.bg-${TYPES_CSS_COLORS[index]}{
    ${bgCSSItem}
}
`
)
}).join('')
}

${
colorCSS.map((colorCSSItem, index) => {
return (
`.text-${TYPES_CSS_COLORS[index]}{
    ${colorCSSItem}
}
`
)
}).join('')
}

${
borderCSS.map((borderCSSItem, index) => {
return (
`.border-${TYPES_CSS_COLORS[index]}{
    ${borderCSSItem}
}
`
)
}).join('')
}

${
outlineCSS.map((outlineCSSItem, index) => {
return (
`.outline-${TYPES_CSS_COLORS[index]}{
    ${outlineCSSItem}
}
`
)
}).join('')
}
`;

    useEffect(() => {
        if(select === 'CSS'){
            setDownload(contentToDownload)
        }
    }, [select])

    return (
        <div className="flex flex-col items-center gap-4">
            <code>
                {':root{'}
                {
                    paletteCSS.map((paletteCSSItem, index) => {
                        return (
                            <div key={index} className="flex justify-between px-4 py-1 items-center">
                                <p className="px-5">{paletteCSSItem}</p>
                                <div className="hidden sm:inline outline outline-2 outline-offset-2 outline-black rounded-full w-4 h-4" style={{ boxShadow: `0 20px 25px -5px ${palette[index].color}, 0 8px 10px -6px ${palette[index].color}`, background: palette[index].color }}></div>
                            </div>
                        )
                    })
                }
                {'}'}
                {
                    bgCSS.map((bgCSSItem, index) => {
                        return (
                            <div key={index} className="flex py-1 items-center">
                                {`.bg-${TYPES_CSS_COLORS[index]}{`}
                                <p>{bgCSSItem}</p>
                                {'}'}
                            </div>
                        )
                    })
                }
                {
                    colorCSS.map((colorCSSItem, index) => {
                        return (
                            <div key={index} className="flex py-1 items-center">
                                {`.text-${TYPES_CSS_COLORS[index]}{`}
                                <p>{colorCSSItem}</p>
                                {'}'}
                            </div>
                        )
                    })
                }
                {
                    borderCSS.map((borderCSSItem, index) => {
                        return (
                            <div key={index} className="flex py-1 items-center">
                                {`.border-${TYPES_CSS_COLORS[index]}{`}
                                <p>{borderCSSItem}</p>
                                {'}'}
                            </div>
                        )
                    })
                }
                {
                    outlineCSS.map((outlineCSSItem, index) => {
                        return (
                            <div key={index} className="flex py-1 items-center">
                                {`.outline-${TYPES_CSS_COLORS[index]}{`}
                                <p>{outlineCSSItem}</p>
                                {'}'}
                            </div>
                        )
                    })
                }
            </code>
        </div>
    )
}

export default ExportCSS