import React, { FunctionComponent, useState } from 'react';
import { IInvoiceTable } from '../entities/invoice';

interface TableRowProps extends IInvoiceTable {
    onChangeTableDataHandler: (rowId: string, key: string, inputData: string | number) => void;
}

const TableRow: FunctionComponent<TableRowProps> = (props: TableRowProps) => {
    const {
        id,
        title,
        description,
        quantity,
        rate,
        onChangeTableDataHandler,
    } = props;

    const [stateTitle, setStateTitle] = useState(title);
    const [stateDesc, setStateDesc] = useState(description);
    const [stateQuantity, setStateQuantity] = useState(quantity);
    const [stateRate, setStateRate] = useState(rate);

    return (
        <div className='flex w-full text-[#5E6470]'>
            <div className='w-[60%] py-2 flex flex-col gap-2'>
                <input
                    className='border border-secondary rounded-md p-2 focus:outline-none w-[50%]'
                    placeholder='Service'
                    value={stateTitle}
                    onChange={(e) => {
                        onChangeTableDataHandler(id, 'title', e.target.value);
                        setStateTitle(e.target.value);
                    }}
                />

                <textarea
                    className='border border-secondary rounded-md p-2 focus:outline-none w-[90%]'
                    placeholder='Your Address Here'
                    value={stateDesc}
                    onChange={(e) => {
                        onChangeTableDataHandler(id, 'description', e.target.value);
                        setStateDesc(e.target.value);
                    }}
                />
            </div>

            <div className='w-[13.3333%] py-2 pr-2 flex items-start'>
                <input
                    className='border border-secondary rounded-md  p-2 w-full focus:outline-none h-fit'
                    placeholder='Quantity'
                    value={stateQuantity}
                    type='number'
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                    onChange={(e) => {
                        onChangeTableDataHandler(id, 'quantity', e.target.value);
                        setStateQuantity(e.target.valueAsNumber);
                    }}
                />
            </div>

            <div className='w-[13.3333%] py-2 pr-2'>
                <input
                    className='border border-secondary rounded-md  p-2 w-full focus:outline-none h-fit'
                    placeholder='Rate'
                    type='number'
                    value={stateRate}
                    onWheel={(e) => (e.target as HTMLElement).blur()}
                    onChange={(e) => {
                        onChangeTableDataHandler(id, 'rate', e.target.value);
                        setStateRate(e.target.valueAsNumber);
                    }}
                />
            </div>

            <div className='w-[13.3333%] py-2 pr-2'>
                <p>{quantity * rate}</p>
            </div>
        </div>
    );
};

export default TableRow;
