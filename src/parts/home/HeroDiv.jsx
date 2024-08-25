import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const HeroDiv = () => {

    const typingSequence = [
        'Code',
        2000,
        'Build',
        2000,
        'Develop',
        2000,
        'Learn',
        2000
    ]

    return (
        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 dark:bg-black before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2 bg-white">
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">

                <div className="mt-5 max-w-2xl text-center mx-auto">
                    <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                        <span>Let's </span>
                        <TypeAnimation   
                            sequence={typingSequence}
                            wrapper='span'
                            speed={10}
                            cursor={false}
                            className='bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent'
                        />
                        <span className=""> Together</span>
                    </h1>
                </div>

                <div className="mt-5 max-w-3xl text-center mx-auto">
                    <p className="text-lg text-gray-600 dark:text-neutral-400">Join our community of developers and enhance your coding skills with our comprehensive problem-solving platform.</p>
                </div>

                <div className="mt-8 gap-3 flex justify-center">
                    <a className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800" href="/login">
                        Get started
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeroDiv