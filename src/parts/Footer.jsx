import React from 'react';

import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="mt-auto w-full py-5 px-3 sm:px-6 lg:px-8 mx-auto bg-transparent">
            <div className="flex sm:flex-row flex-col justify-between items-center gap-5">
                <div>
                    <a className="flex-none text-md md:text-xl font-semibold text-black dark:text-white" href="#" aria-label="Brand">LeetClone</a>
                </div>

                <div className="flex flex-row justify-center items-center dark:text-white text-center">
                    <span className='text-sm'>
                    Resume project created by <span className='font-bold'>@visheshdvivedi</span>
                    </span>
                </div>
                <div className="md:text-end space-x-1 sm:space-x-2">
                    <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="mailto:visheshdvivedi5012@gmail.com" target='_blank' rel="noreferrer">
                        <FaGoogle />
                    </a>
                    <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="https://github.com/visheshdvivedi" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="https://linkedin.com/in/visheshdvivedi" target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer