import { useEffect, useState } from 'react'

import { DownloadIcon } from './../assets/icons/Icons';
import ExportCSS from './export/ExportCSS'
import ExportPDF from './export/ExportPDF'
import ExportTailwind from './export/ExportTailwind'
import { saveAs } from 'file-saver'
import { usePDF } from 'react-to-pdf'

const ModalPreviewDownload = ({ modalPDFRef, showPDFModal, palette, closePDFModal }) => {
    const [select, setSelect] = useState('PDF')
    const [download, setDownload] = useState('')
    const { toPDF, targetRef } = usePDF({ filename: 'palette.pdf' })


    const exportCode = () => {
        if(select === 'PDF'){
            toPDF()
        }else if(select === 'CSS'){
            const blob = new Blob([download], { type: 'text/css;charset=utf-8' })
            saveAs(blob, 'palette.css')
        }else if(select === 'Tailwind'){
            const blob = new Blob([download], { type: 'text/js;charset=utf-8' })
            saveAs(blob, 'tailwind.js')
        }
    }

    useEffect(() => {
        if(select === 'PDF'){
            setDownload('')
        }
    }, [select])

    return (
        <dialog ref={modalPDFRef} className={`${!showPDFModal ? 'hidden' : ''} min-h-80 flex flex-col md:gap-8 z-50 items-center bg-slate-100 shadow-xl shadow-gray-400 rounded-2xl`}>
            <div className='flex justify-center sticky top-0 bg-slate-100/90 w-full py-5 backdrop:blur-3xl'>
                <h2 className='font-bold text-2xl'>{select || 'Export'} Preview</h2>
            </div>
            <div className='lg:px-8'>
                {
                    select === 'PDF' && (
                        <ExportPDF refElement={targetRef} palette={palette} />
                    )
                }
                {
                    select === 'CSS' && (
                        <ExportCSS select={select} setDownload={setDownload} palette={palette} />
                    )
                }
                {
                    select === 'Tailwind' && (
                        <ExportTailwind select={select} setDownload={setDownload} palette={palette} />
                    )
                }
            </div>
            <div className='flex flex-col md:flex-row items-center md:justify-center gap-4 md:gap-8 sticky bottom-0 bg-slate-100/90 backdrop:blur-3xl w-full py-5 md:px-8'>
                <div className='flex gap-2'>
                    <button onClick={exportCode} className='bg-green-200 flex gap-2 font-bold text-sm p-2 shadow-md shadow-green-300 rounded-lg hover:outline hover:outline-1 hover:outline-green-600'>
                        <DownloadIcon width={20} height={20} /> 
                        Export as:
                    </button>
                    <select onChange={ ({ target }) => setSelect(target.value) } className='bg-transparent outline-none rounded-md hover:outline hover:outline-gray-200 hover:outline-2'>
                        <option value='PDF' defaultChecked>PDF File</option>
                        <option value='CSS'>CSS File</option>
                        <option value='Tailwind'>Tailwind Code</option>
                    </select>
                </div>
                <button onClick={closePDFModal} className='hover:bg-red-200 font-bold text-sm py-2 lg:px-6 hover:shadow-md hover:shadow-red-300 rounded-lg hover:outline hover:outline-1 hover:outline-red-600'>Close</button>
            </div>
        </dialog>
    )
}

export default ModalPreviewDownload