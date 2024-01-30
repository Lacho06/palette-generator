const PaletteTabs = ({ className = "", children }) => {
    return (
        <ul className={`${className} w-full grid grid-cols-12 gap-4 text-gray-400 font-bold`}>
            { children }
        </ul>
    )
}

export default PaletteTabs