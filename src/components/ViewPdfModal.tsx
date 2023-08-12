import React, { FunctionComponent } from 'react';
import { Dialog } from '@headlessui/react';
import { PDFViewer } from '@react-pdf/renderer';

import PdfDocument from './Pdf';

import { IInvoice } from '../entities/invoice';

interface ViewPdfModalProps {
    isOpen: boolean;
    data: IInvoice;
    setIsOpen: (state: boolean) => void;
}

const ViewPdfModal: FunctionComponent<ViewPdfModalProps> = (props: ViewPdfModalProps) => {
    const { isOpen, data, setIsOpen } = props;

    return (
        <Dialog
            className='fixed inset-0 overflow-y-auto flex justify-center items-center'
            open={isOpen}
            onClose={() => setIsOpen(false)}
        >

            <Dialog.Overlay className='fixed inset-0 bg-black/70' />

            <Dialog.Panel className='bg-[#232323] w-[80%] h-[80%] rounded-lg p-4 relative flex flex-col gap-2'>
                <Dialog.Title className='font-bold text-4xl'>
                    This is the PDF
                </Dialog.Title>

                <PDFViewer className='w-full h-full border border-white rounded-lg'>
                    <PdfDocument data={data} />
                </PDFViewer>
            </Dialog.Panel>
        </Dialog>
    );
};

export default ViewPdfModal;
