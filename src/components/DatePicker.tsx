import React, { FunctionComponent, useState } from 'react';
import { Popover } from '@headlessui/react';
import SVG from 'react-inlinesvg';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    getDay,
    isEqual,
    isSameMonth,
    parse,
    startOfToday,
    startOfWeek,
} from 'date-fns';

import LeftChevron from '../assets/icons/chevron-left.svg';
import RightChevron from '../assets/icons/chevron-right.svg';

const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
];

interface DatePickerProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

const DatePicker: FunctionComponent<DatePickerProps> = (props: DatePickerProps) => {
    const { selectedDate, setSelectedDate } = props;

    const today = startOfToday();

    // const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM yyyy'));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM yyyy', new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth),
        end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });

    const nextMonth = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM yyyy'));
    };

    const previousMonth = () => {
        const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
        setCurrentMonth(format(firstDayNextMonth, 'MMM yyyy'));
    };

    return (
        <Popover className='relative'>
            <Popover.Button className='border border-secondary p-2 rounded-md outline-none'>
                {format(selectedDate, 'dd MMM, yyyy')}
            </Popover.Button>

            <Popover.Panel className='absolute z-10 mt-2'>
                <div className='p-4 rounded-md flex flex-col gap-2 border border-secondary bg-white'>
                    <div className='flex justify-between'>
                        <p className='font-bold'>{currentMonth}</p>

                        <div>
                            <button onClick={previousMonth}>
                                <SVG src={LeftChevron} />
                            </button>

                            <button onClick={nextMonth}>
                                <SVG src={RightChevron} />
                            </button>
                        </div>
                    </div>
                    <div className='grid grid-cols-7 text-xs leading-6 text-center gap-2 p-1 font-bold border-b border-b-secondary'>
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>

                    <div className='grid grid-cols-7 text-sm gap-2 p-1'>
                        {days.map((day) => {
                            return (
                                <button
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={`
                                        ${colStartClasses[getDay(day)]} 
                                        ${isSameMonth(day, firstDayCurrentMonth) ? 'text-black' : 'text-[#D7DAE0]'}
                                        ${isEqual(day, today) && 'text-white bg-secondary'}
                                        ${isEqual(day, selectedDate) && 'text-white bg-[#7C4DFF]'}
                                        flex justify-center items-center p-1 rounded-full text-md
                                        hover:bg-[#7C4DFF] hover:text-white
                                    `}
                                >
                                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                                        {format(day, 'd')}
                                    </time>
                                </button>

                            );
                        })}
                    </div>
                </div>
            </Popover.Panel>
        </Popover>
    );
};

export default DatePicker;
