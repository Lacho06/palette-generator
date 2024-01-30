import PaletteTrendsColor from "./PaletteTrendsColor"

const PaletteTrends = ({ palette = [] }) => {
    const types = ['primary', 'dark primary', 'secondary', 'dark secondary', 'accent']
    return (
        <div className="grid grid-cols-12 gap-4 outline outline-2 outline-gray-200 rounded-lg p-4 col-span-10 col-start-2 xl:col-span-12">
            {
                palette.map((color, index) => {
                    return (<div key={index} className="col-span-6 md:col-span-4 first-of-type:xl:col-start-2 xl:col-span-2 flex flex-col items-center">
                        <PaletteTrendsColor color={color} />
                        <span className="capitalize text-xs text-center">{types[index]}</span>
                    </div>)
                })
            }
        </div>
    )
}

export default PaletteTrends