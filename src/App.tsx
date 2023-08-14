import React, { FunctionComponent, useState } from 'react';
import { startOfToday } from 'date-fns';
import { nanoid } from 'nanoid';

import { IInvoiceTable } from './entities/invoice';

import ViewPdfModal from './components/ViewPdfModal';
import DatePicker from './components/DatePicker';
import TableRow from './components/TableRow';
import Tiptap from './components/TipTap';

const App: FunctionComponent = () => {
    const today = startOfToday();

    const [isOpen, setIsOpen] = useState(false);

    const [billedTo, setBilledTo] = useState('');
    const [from, setFrom] = useState('');

    const [issuedDate, setIssuedDate] = useState(today);
    const [dueDate, setDueDate] = useState(today);

    const [tax, setTax] = useState(0);

    const [extraDesc, setExtraDesc] = useState('');

    const [accountName, setAccountName] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNo, setAccountNo] = useState('');

    const [tableData, setTableData] = useState<IInvoiceTable[]>([{
        id: nanoid(),
        title: '',
        description: '',
        quantity: 0,
        rate: 0,
    }]);

    const onChangeTableDataHandler = (rowId: string, key: string, inputData: string | number) => {
        const newTableData: IInvoiceTable[] = tableData.map(item => {
            const { id } = item;

            if (id === rowId) {
                return {
                    ...item,
                    [key]: inputData,
                };
            }

            return item;
        });

        setTableData(newTableData);
    };

    const addRowHandler = () => {
        setTableData([...tableData, {
            id: nanoid(),
            title: '',
            description: '',
            quantity: 0,
            rate: 0,
        }]);
    };

    const calculatePreTaxTotal = () => {
        let preTaxTotal = 0;

        tableData.forEach(item => {
            preTaxTotal += (item.rate * item.quantity);
        });

        return Number(preTaxTotal.toFixed(2));
    };

    const calculateAfterTaxTotal = () => {
        if (tax) {
            return Number((calculatePreTaxTotal() * tax).toFixed(2));
        }

        return calculatePreTaxTotal();
    };

    return (
        <div className='flex flex-col gap-2 items-center p-2'>
            <h1 className='text-4xl font-bold'>
                INVOICE GENERATOR
            </h1>

            <div className='w-[80%] h-full bg-white text-black p-10 rounded-lg flex flex-col gap-6'>
                <div>
                    <h2 className='text-4xl font-bold'>INVOICE</h2>

                    <p className='text-secondary'>#AB2324-01</p>
                </div>

                <div className='flex justify-between border-y border-y-[#D7DAE0]'>
                    <div className='flex flex-col gap-6 py-4 w-1/3'>
                        <div className='flex flex-col gap-1'>
                            <p className='font-bold'>Issued</p>
                            <DatePicker
                                selectedDate={issuedDate}
                                setSelectedDate={setIssuedDate}
                            />
                        </div>

                        <div className='flex flex-col gap-1 '>
                            <p className='font-bold'>Due</p>
                            <DatePicker
                                selectedDate={dueDate}
                                setSelectedDate={setDueDate}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 p-4 w-1/3 border-x border-x-[#D7DAE0]'>
                        <p className='font-bold'>
                            Billed to
                        </p>

                        <textarea
                            className='border border-secondary rounded-md text-[#5E6470] p-2 focus:outline-none h-full'
                            placeholder='Clients Address Here'
                            value={billedTo}
                            onChange={(e) => setBilledTo(e.target.value)}
                        />
                    </div>

                    <div className='flex flex-col gap-4 p-4 w-1/3 border-x border-x-[#D7DAE0]'>
                        <p className='font-bold'>
                            From
                        </p>

                        <textarea
                            className='border border-secondary rounded-md text-[#5E6470] p-2 focus:outline-none h-full'
                            placeholder='Your Address Here'
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                </div>

                <div className='flex w-full mt-6 border-b border-b-light'>
                    <div className='w-[60%] py-2'>
                        <p className='font-bold'>Service</p>
                    </div>

                    <div className='w-[13.3333%] py-2'>
                        <p className='font-bold'>Qty</p>
                    </div>

                    <div className='w-[13.3333%] py-2'>
                        <p className='font-bold'>Rate</p>
                    </div>

                    <div className='w-[13.3333%] py-2'>
                        <p className='font-bold'>Line Total</p>
                    </div>
                </div>

                {tableData.map(item => {
                    const {
                        id,
                        title,
                        description,
                        quantity,
                        rate,
                    } = item;

                    return (
                        <TableRow
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            quantity={quantity}
                            rate={rate}
                            onChangeTableDataHandler={onChangeTableDataHandler}
                        />
                    );
                })}

                <div className='flex w-full justify-end'>
                    <button
                        className='bg-[#7C4DFF] text-white p-2 px-6 rounded-md text-xl font-bold'
                        onClick={addRowHandler}
                    >
                        Add Row
                    </button>
                </div>

                <div className='flex flex-col w-full items-end border-t border-t-light'>
                    <div className='w-[40%] py-4 flex justify-between items-center border-b border-b-light'>
                        <p className='font-bold'>
                            Subtotal
                        </p>

                        <p className='text-[#5E6470]'>
                            {calculatePreTaxTotal()}
                        </p>
                    </div>

                    <div className='w-[40%] py-4 flex justify-between items-center border-b border-b-light'>
                        <p className='font-bold'>
                            Tax(%)
                        </p>

                        <input
                            className='border border-secondary rounded-md p-1 px-2 w-[30%] focus:outline-none h-fit'
                            placeholder='Tax %'
                            value={tax}
                            type='number'
                            onWheel={(e) => (e.target as HTMLElement).blur()}
                            onChange={(e) => {
                                setTax(e.target.valueAsNumber);
                            }}
                        />
                    </div>

                    <div className='w-[40%] py-4 flex justify-between items-center'>
                        <p className='font-bold'>
                            Total
                        </p>

                        <p className='text-[#5E6470]'>
                            {calculateAfterTaxTotal()}
                        </p>
                    </div>

                    <div className='w-[40%] py-4 flex justify-between items-center border-y-2 border-y-[#7C4DFF]'>
                        <p className='font-bold'>
                            Amount Due
                        </p>

                        <p className='text-[#5E6470]'>
                            {calculateAfterTaxTotal()}
                        </p>
                    </div>
                </div>

                <div className='flex flex-col w-full border-t border-t-light py-4 gap-4'>
                    <p className='font-bold text-xl'>
                        Extra Descriptions
                    </p>

                    <textarea
                        className='border border-secondary rounded-md text-[#5E6470] p-2 focus:outline-none h-full'
                        placeholder='...'
                        value={extraDesc}
                        onChange={(e) => setExtraDesc(e.target.value)}
                    />
                </div>

                <div className='flex w-full items-center justify-between'>
                    <p className='text-[#5E6470]'>PAYMENT INFO</p>

                    <div className='h-[1px] border border-light w-[85%]' />
                </div>

                <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col w-[40%]'>
                        <p className='text-[#5E6470] font-bold'>
                            ACCOUNT NAME
                        </p>

                        <input
                            className='border border-secondary rounded-md p-1 px-2 w-full focus:outline-none h-fit'
                            placeholder='Account Name'
                            value={accountName}
                            onChange={(e) => {
                                setAccountName(e.target.value);
                            }}
                        />
                    </div>

                    <div className='flex w-[40%] items-center'>
                        <div className='flex flex-col w-1/2 border-r border-r-light pr-2'>
                            <p className='text-[#5E6470] font-bold'>
                                BANK NAME
                            </p>

                            <input
                                className='border border-secondary rounded-md p-1 px-2 w-full focus:outline-none h-fit'
                                placeholder='Bank Name'
                                value={bankName}
                                onChange={(e) => {
                                    setBankName(e.target.value);
                                }}
                            />
                        </div>

                        <div className='flex flex-col w-1/2 pl-2'>
                            <p className='text-[#5E6470] font-bold'>
                                ACCOUNT #
                            </p>

                            <input
                                className='border border-secondary rounded-md p-1 px-2 w-full focus:outline-none h-fit'
                                placeholder='Account Num'
                                value={accountNo}
                                onChange={(e) => {
                                    setAccountNo(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-[80%] flex justify-end'>
                <button
                    className='bg-[#7C4DFF] text-white p-2 px-6 rounded-md text-xl font-bold'
                    onClick={() => setIsOpen(true)}
                >
                    Generate Invoice
                </button>
            </div>

            <ViewPdfModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={{
                    billedTo,
                    from,
                    issuedDate,
                    dueDate,
                    tableData,
                    subTotal: calculatePreTaxTotal(),
                    tax,
                    total: calculateAfterTaxTotal(),
                    extraDesc,
                    accountName,
                    bankName,
                    accountNo,
                }}
            />
        </div>
    );
};

export default App;
