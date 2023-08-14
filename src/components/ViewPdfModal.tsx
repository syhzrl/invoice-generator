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

            <Dialog.Panel className='bg-[#232323] w-[90%] h-[90%] rounded-lg p-2 relative flex flex-col gap-2'>
                <PDFViewer className='w-full h-full border border-white rounded-lg'>
                    <PdfDocument data={data} />
                </PDFViewer>
            </Dialog.Panel>
        </Dialog>
    );
};

export default ViewPdfModal;
