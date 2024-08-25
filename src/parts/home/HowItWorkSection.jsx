import React from 'react'

import tutorialIcon from "../../assets/undraw_tutorial.svg";
import { AiOutlineUser, AiOutlineQuestion, AiOutlineSolution, AiFillWechat, AiOutlineWechat, AiOutlineWechatWork } from 'react-icons/ai';

const HowItWorkSection = () => {

    const steps = [
        {
            title: "Create a free account",
            content: "Sign up for free to get started. Create an account by providing your email, username, and password. Once registered, you can log in and start exploring the platform.",
            icon: <AiOutlineUser size={50} className='text-violet-600 dark:text-sky-400' />
        },
        {
            title: "Browse and select problem",
            content: "Navigate through our extensive problem library. Filter problems by difficulty level, topic, or tags to find the challenges that suit your skill level and learning goals.",
            icon: <AiOutlineQuestion size={50} className='text-violet-600 dark:text-sky-400' />
        },
        {
            title: "Solve and submit solutions",
            content: "Choose a problem and start coding directly in our interactive code editor. Write, run, and test your code within the browser. When you're ready, submit your solution to see if it passes all test cases.",
            icon: <AiOutlineSolution size={50} className='text-violet-600 dark:text-sky-400' />
        },
        {
            title: "Provide feedback",
            content: "Use the feedback section to provide feedback on any found bugs/glitches or any improvement ideas for improving experience for other coders in future",
            icon: <AiOutlineWechatWork size={50} className='text-violet-600 dark:text-sky-400' />
        }
    ]

    return (
        <div className='bg-white flex flex-row justify-center dark:bg-black dark:text-white py-10'>
            <div className='w-[85rem] flex flex-row justify-evenly items-center px-5 py-4'>
                <div className='flex flex-col items-center gap-5'>
                    <span className='font-bold bg-clip-text text-violet-600 dark:text-sky-400 text-transparent' style={{ fontSize: "36px" }}>How It Works</span>
                    <div className='grid grid-rows-2 grid-cols-1 sm:grid-cols-2 gap-8'>

                    { steps.map(step => (
                        <div key={step.title} className='flex flex-col justify-start items-center px-3 py-2 rounded-xl gap-3 border bg-stone-50 dark:bg-black dark:border-0'>
                            {step.icon}
                            <span className='font-bold text-md'>{ step.title }</span>
                            <span className='text-center text-sm'>{ step.content }</span>
                        </div>      
                    )) }

                    </div>
                </div>
                <img src={tutorialIcon} width={400} alt="tutorial icon" className='hidden lg:block' />
            </div>
        </div>
    )
}

export default HowItWorkSection