import React, { useState } from 'react'
import { BsJournalArrowDown, BsJournalArrowUp } from 'react-icons/bs';

const ConversationModeToggle = (props: { setMode: Function, isBuying: boolean }) => {


    const handleCheckboxChange = () => {
        props.setMode((val: boolean) => !val);
    }

    return (
        <>
            <label className='dark themeSwitcherThree relative inline-flex cursor-pointer select-none items-center'>
                <input
                    type='checkbox'
                    checked={props.isBuying}
                    onChange={handleCheckboxChange}
                    className='sr-only'
                />
                <span className='mr-[18px] text-sm font-medium text-white'>
                    Conversation Mode
                </span>
                <div className='shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-black'>
                    <span
                        className={`flex h-9 w-9 items-center justify-center rounded ${!props.isBuying ? 'bg-primary text-white' : 'text-body-color'
                            }`}
                    >
                        <BsJournalArrowDown color={`${props.isBuying ? 'indigo' : 'white'}`} />
                        {/* <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <g clipPath='url(#clip0_3128_692)'>
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M8 0C8.36819 0 8.66667 0.298477 8.66667 0.666667V2C8.66667 2.36819 8.36819 2.66667 8 2.66667C7.63181 2.66667 7.33333 2.36819 7.33333 2V0.666667C7.33333 0.298477 7.63181 0 8 0ZM8 5.33333C6.52724 5.33333 5.33333 6.52724 5.33333 8C5.33333 9.47276 6.52724 10.6667 8 10.6667C9.47276 10.6667 10.6667 9.47276 10.6667 8C10.6667 6.52724 9.47276 5.33333 8 5.33333ZM4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8ZM8.66667 14C8.66667 13.6318 8.36819 13.3333 8 13.3333C7.63181 13.3333 7.33333 13.6318 7.33333 14V15.3333C7.33333 15.7015 7.63181 16 8 16C8.36819 16 8.66667 15.7015 8.66667 15.3333V14ZM2.3411 2.3424C2.60145 2.08205 3.02356 2.08205 3.28391 2.3424L4.23057 3.28906C4.49092 3.54941 4.49092 3.97152 4.23057 4.23187C3.97022 4.49222 3.54811 4.49222 3.28776 4.23187L2.3411 3.28521C2.08075 3.02486 2.08075 2.60275 2.3411 2.3424ZM12.711 11.7682C12.4506 11.5078 12.0285 11.5078 11.7682 11.7682C11.5078 12.0285 11.5078 12.4506 11.7682 12.711L12.7148 13.6577C12.9752 13.918 13.3973 13.918 13.6577 13.6577C13.918 13.3973 13.918 12.9752 13.6577 12.7148L12.711 11.7682ZM0 8C0 7.63181 0.298477 7.33333 0.666667 7.33333H2C2.36819 7.33333 2.66667 7.63181 2.66667 8C2.66667 8.36819 2.36819 8.66667 2 8.66667H0.666667C0.298477 8.66667 0 8.36819 0 8ZM14 7.33333C13.6318 7.33333 13.3333 7.63181 13.3333 8C13.3333 8.36819 13.6318 8.66667 14 8.66667H15.3333C15.7015 8.66667 16 8.36819 16 8C16 7.63181 15.7015 7.33333 15.3333 7.33333H14ZM4.23057 11.7682C4.49092 12.0285 4.49092 12.4506 4.23057 12.711L3.28391 13.6577C3.02356 13.918 2.60145 13.918 2.3411 13.6577C2.08075 13.3973 2.08075 12.9752 2.3411 12.7148L3.28776 11.7682C3.54811 11.5078 3.97022 11.5078 4.23057 11.7682ZM13.6577 3.28521C13.918 3.02486 13.918 2.60275 13.6577 2.3424C13.3973 2.08205 12.9752 2.08205 12.7148 2.3424L11.7682 3.28906C11.5078 3.54941 11.5078 3.97152 11.7682 4.23187C12.0285 4.49222 12.4506 4.49222 12.711 4.23187L13.6577 3.28521Z'
                                    fill='currentColor'
                                ></path>
                            </g>
                            <defs>
                                <clipPath id='clip0_3128_692'>
                                    <rect width='16' height='16' fill='white'></rect>
                                </clipPath>
                            </defs>
                        </svg> */}
                    </span>
                    <span
                        className={`flex h-9 w-9 items-center justify-center rounded ${props.isBuying ? 'bg-primary text-white' : 'text-body-color'
                            }`}
                    >
                        <BsJournalArrowUp color={`${props.isBuying ? 'white' : 'indigo'}`} />
                    </span>
                </div>
            </label>
        </>
    )
}

export default ConversationModeToggle;
