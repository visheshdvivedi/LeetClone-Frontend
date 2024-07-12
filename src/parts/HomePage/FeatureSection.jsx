import React from 'react'

import featureIcon from "../../assets/undraw_feature.svg"
import { IoLibrary, IoTerminal, IoText } from 'react-icons/io5'

const FeatureSection = () => {

    const features = [
        {
            title: "Extensive Problem Library",
            content: "Access a vast collection of coding problems, ranging from easy to hard, covering various topics and difficulty levels. Our problem library is designed to help you prepare for technical interviews and improve your problem-solving skills.",
            icon: <IoLibrary className='text-violet-600 dark:text-sky-400' size={100} />
        },
        {
            title: "Interactive Code Editor",
            content: "Write, run, and test your code directly in the browser with our powerful, user-friendly code editor. It supports multiple programming languages and provides an intuitive interface to streamline your coding experience.",
            icon: <IoTerminal className='text-violet-600 dark:text-sky-400' size={100} />
        },
        {
            title: "Instant Feedback and Detailed Solution",
            content: "Submit your solutions and receive immediate feedback on your code. Understand your mistakes and learn from them with detailed explanations and optimal solutions provided for each problem.",
            icon: <IoText className='text-violet-600 dark:text-sky-400' size={100} />
        }
    ]

    return (
        <div className='bg-slate-100 flex flex-row justify-center dark:text-white dark:bg-neutral-800 py-10'>
            <div className='w-[85rem] flex flex-row justify-evenly items-center px-5 py-4'>
                <img src={featureIcon} width={400}  />
                <div className='w-1/2 flex flex-col items-center gap-5'>
                    <span className='font-bold bg-clip-text text-violet-600 dark:text-sky-400 text-transparent' style={{ fontSize: "36px" }}>Features</span>
                    { features.map(feature => (
                        <div className='flex flex-row items-center gap-10'>
                            { feature.icon }
                            <div key={feature.title} className='flex flex-col justify-start items-start'>
                                <span className='font-bold text-xl'>{ feature.title }</span>
                                <span>{ feature.content }</span>
                            </div>
                        </div>      
                    )) }
                </div>
            </div>
        </div>
    )
}

export default FeatureSection