import React from 'react';

import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer class="mt-auto w-full py-10 px-4 sm:px-6 lg:px-8 mx-auto dark:bg-black">
            <div class="grid grid-cols-1 md:grid-cols-3 items-center gap-5">
                <div>
                    <a class="flex-none text-xl font-semibold text-black dark:text-white" href="#" aria-label="Brand">LeetClone</a>
                </div>

                <div class="flex flex-row justify-center items-center dark:text-white">
                    <span className='text-sm'>
                    Resume project created by <span className='font-bold'>@visheshdvivedi</span>
                    </span>
                </div>
                <div class="md:text-end space-x-2">
                    <a class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="mailto:visheshdvivedi@zohomail.eu" target='_blank'>
                        <FaGoogle />
                    </a>
                    <a class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="https:///github.com/visheshdvivedi" target="_blank">
                        <FaGithub />
                    </a>
                    <a class="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-700" href="https://linkedin.com/in/visheshdvivedi" target="_blank">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer