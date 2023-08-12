import React, { FunctionComponent, useState } from 'react';
import { startOfToday } from 'date-fns';

import ViewPdfModal from './components/ViewPdfModal';
import DatePicker from './components/DatePicker';

const App: FunctionComponent = () => {
    const today = startOfToday();

    const [isOpen, setIsOpen] = useState(false);

    const [billedTo, setBilledTo] = useState('');
    const [from, setFrom] = useState('');

    const [issuedDate, setIssuedDate] = useState(today);
    const [dueDate, setDueDate] = useState(today);

    return (
        <div className='flex flex-col gap-2 w-screen h-screen items-center p-2'>
            <h1 className='text-4xl font-bold'>
                INVOICE GENERATOR
            </h1>

            <div className='w-[80%] h-full bg-white text-black p-12 rounded-lg flex flex-col gap-6'>
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
                            className='border border-secondary rounded-md bg-[#D7DAE0] p-2 focus:outline-none'
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
                            className='border border-secondary rounded-md bg-[#D7DAE0] p-2 focus:outline-none'
                            placeholder='Your Address Here'
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <button
                className='bg-white text-black p-4 rounded-lg'
                onClick={() => setIsOpen(true)}
            >
                Open
            </button>

            <ViewPdfModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                data={{
                    billedTo,
                    from,
                    issuedDate,
                    dueDate,
                }}
            />
        </div>
    );
};

export default App;
