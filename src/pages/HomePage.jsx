import { GitHubIcon, InfoIcon } from './../assets/icons/Icons';

import FormSearchColor from '../components/FormSearchColor';
import ModalChangeColor from '../components/ModalChangeColor';
import ModalColorSuggest from '../components/ModalColorSuggest';
import ModalMakeGradients from '../components/ModalMakeGradients';
import ModalPreviewDownload from '../components/ModalPreviewDownload';
import PaletteItem from '../components/PaletteItem'
import PaletteTabs from '../components/PaletteTabs';
import PaletteTrends from '../components/PaletteTrends';
import { TREND_PALETTES } from '../constants/app';
import { generatePalette } from '../services/app'
import { initialPalette } from '../services/palette';
import { useKeyboard } from '../hooks/useKeyboard';
import { useModal } from '../hooks/useModal';
import { useModalSuggest } from '../hooks/useModalSuggest';
import { useModalVariant } from '../hooks/useModalVariant';
import { usePalette } from '../hooks/usePalette';

const HomePage = () => {
    const [palette, changeLocked, changePalette, changeColor] = usePalette(initialPalette(), generatePalette)
    const [toggleIsInput] = useKeyboard(palette, changePalette)
    const [modalInfo, modalSuggestRef, showModal, openModalColorSuggest, closeModal] = useModalSuggest()
    const [item, showModalVariant, modalVariantRef, openVariantModal, closeVariantModal, submitAction] = useModalVariant(changeColor)
    const [showGradientModal, modalGradientRef, openGradientModal, closeGradientModal] = useModal()
    const [showPDFModal, modalPDFRef, openPDFModal, closePDFModal] = useModal()


    return (
        <div className="grid grid-cols-12 gap-2 md:gap-4 lg:gap-8">
            <header className="col-span-12 flex justify-center px-2 md:px-4 py-3 md:py-5">
                <h1 className="text-2xl lg:text-5xl inline font-bold text-transparent" style={{ background: 'linear-gradient(to right, #AFA2D2 30%, #9825B2)', backgroundClip: 'text' }}>Colors Palette Generator</h1>
            </header>
            <main className="grid grid-cols-12 gap-2 lg:gap-8 col-span-12 px-2 md:px-4">
                <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-start-1 lg:col-span-6 flex flex-col gap-2 lg:gap-8">
                    {/* Form section */}
                    <section className="flex flex-col px-4 lg:px-8 items-center lg:gap-16 bg-slate-100 shadow-md shadow-slate-200 rounded-2xl py-5">
                        <FormSearchColor toggleIsInput={toggleIsInput} action={openModalColorSuggest} openModalGradient={openGradientModal} />
                    </section>

                    {/* Palette Section */}
                    <section className="flex flex-col items-center gap-16 bg-slate-100 shadow-lg shadow-slate-300 rounded-2xl pt-5 pb-10">
                        <PaletteTabs className="px-2 lg:px-8 xl:px-10">
                            <li className="col-span-5 lg:col-span-3">
                                <button className='w-full disabled:hover:bg-red-200 disabled:hover:text-slate-50 disabled:hover:cursor-not-allowed text-center my-auto hover:outline hover:outline-2 hover:outline-gray-300 p-1 rounded-2xl' onClick={changePalette} disabled={palette.every(item => item.locked)}>New Palette</button>
                            </li>
                            {/* Quitar cuando se agreguen mas tabs */}
                            <div className='col-span-2 lg:col-span-6'></div>
                            {/* ? MEJORABLE para una proxima version */}
                            {/* <li className="col-span-3">
                                <button className='w-full text-center my-auto hover:outline hover:outline-2 hover:outline-gray-300 p-1 rounded-2xl'>Adjust Palette</button>
                            </li>
                            <li className="col-span-3">
                                <button className='w-full text-center my-auto hover:outline hover:outline-2 hover:outline-gray-300 p-1 rounded-2xl'>Share</button>
                            </li> */}
                            <li className="col-span-5 lg:col-span-3 bg-gray-200 hover:bg-gray-400 hover:text-white-50 my-auto text-center p-1 rounded-2xl text-black">
                                <button onClick={openPDFModal}>Download</button>
                            </li>
                        </PaletteTabs>
                        <div className="w-full grid grid-cols-12 gap-4 xl:gap-8">
                            {
                                palette.map((item, index) => {
                                    return <PaletteItem className='col-span-12 md:col-span-6 xl:col-span-2 first-of-type:xl:col-start-2' key={index} actionVariant={openVariantModal} openModalSuggest={openModalColorSuggest} changeLocked={() => changeLocked(item)} item={item} />
                                })
                            }
                        </div>
                    </section>
                    <div className="flex flex-col items-center bg-slate-100 shadow-lg shadow-slate-300 rounded-2xl p-3">
                        <p className='font-bold text-xl flex items-center gap-2'><InfoIcon /> Press the key <span className='font-extrabold text-[#AFA2D2]'>C</span> to change the palette</p>
                    </div>
                </div>

                {/* Trends Section */}
                <section className="flex flex-col col-span-12 md:col-span-10 md:col-start-2 lg:col-span-6 lg:px-8 items-center gap-8 lg:gap-16 bg-slate-100 shadow-lg shadow-slate-300 rounded-2xl py-5">
                    <div className="flex justify-center md:w-full lg:px-2 font-bold text-2xl">
                        <h2>More likely palettes</h2>
                    </div>
                    <div className="grid grid-cols-12 gap-4 md:w-full font-bold">
                        {
                            TREND_PALETTES.map((item, index) => {
                                return <PaletteTrends key={index} palette={[...item]} />
                            })
                        }
                    </div>
                </section>
            </main>
            <ModalPreviewDownload palette={palette} showPDFModal={showPDFModal} modalPDFRef={modalPDFRef} closePDFModal={closePDFModal} />
            <ModalMakeGradients showGradientModal={showGradientModal} modalGradientRef={modalGradientRef} closeGradientModal={closeGradientModal} />
            <ModalChangeColor item={item} submitAction={submitAction} showModalVariant={showModalVariant} modalVariantRef={modalVariantRef} closeVariantModal={closeVariantModal} />
            <ModalColorSuggest className={!showModal ? 'hidden' : ''} modalInfo={modalInfo} modalSuggestRef={modalSuggestRef} onClose={closeModal} />
            <footer className='col-span-12 h-40 pt-20 flex justify-center items-end pb-5'>
                <p className='font-bold text-xl flex items-center'>Developed by <GitHubIcon width={24} height={24} className='ml-3' /><a href="https://github.com/Lacho06" target='_blank' className='text-[#AFA2D2]'>Lacho06dev</a></p>
            </footer>
        </div>
    )
}

export default HomePage