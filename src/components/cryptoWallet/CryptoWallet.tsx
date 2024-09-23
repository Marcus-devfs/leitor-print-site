import React, { ReactNode, useEffect, useState } from 'react';
import { CardIcon } from '../card';

interface CryptoModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children?: ReactNode,
    title?: string,
    type?: string
}

export const CryptoModal: React.FC<CryptoModalProps> = ({ isOpen, closeModal, children, title = '', type }) => {

    const defaultTimer = type === 'success' ? 4 : 7
    const [timer, setTimer] = useState(defaultTimer)

    useEffect(() => setTimer(defaultTimer), [isOpen])
    useEffect(() => {
        if (isOpen && timer > 0) {
            setTimeout(() => setTimer(prev => prev - 0.015), 15)
            return
        }
        closeModal()
    }, [timer, isOpen])


    const progressWidth = (timer / defaultTimer) * 100;

    return (
        <div
            id="crypto-modal"
            className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="relative p-1 w-full max-w-sm max-h-full overflow-y-auto bg-white rounded-lg shadow-lg">
                <div className="relative">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-lg font-semibold text-gray-900">
                            {title}
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={closeModal}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5">
                        {children}
                    </div>
                    <div className='flex w-full'>
                        <div className={`flex items-center justify-start h-2 absolute bottom-0 ${(type === 'info' && 'bg-amber-400') ||
                            (type === 'success' && 'bg-green-500') ||
                            (type === 'error' && 'bg-red-600')}`} style={{ width: `${progressWidth}%` }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

