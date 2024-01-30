const PaletteTrendsColor = ({ color }) => {
    return (
        <div className="w-full flex flex-col items-center justify-between">
            <div className="rounded-full outline outline-2 outline-offset-2 outline-black w-8 h-8 mb-4" style={{ boxShadow: `0 20px 25px -5px ${color}, 0 8px 10px -6px ${color}`, background: color }}></div>
            <p className="font-bold">{ color }</p>
        </div>
    )
}

export default PaletteTrendsColor