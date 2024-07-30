import React from 'react'

import { SiDjango } from 'react-icons/si';
import developerIcon from "../../assets/undraw_developer.svg";
import { BiLogoTailwindCss, BiLogoGmail } from 'react-icons/bi';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaLinkedin } from 'react-icons/fa';

import { Link } from 'react-router-dom';

const AboutDeveloperSection = () => {
    return (
        <div className='bg-slate-100 flex flex-row justify-center dark:bg-neutral-800 dark:text-white py-10'>
            <div className='w-[85rem] flex flex-row justify-evenly items-center px-5 py-4'>
            <img src={developerIcon} width={400}  />
                <div className='w-1/2 flex flex-col items-start gap-5'>
                    <span className='font-bold bg-clip-text text-violet-600 dark:text-sky-400 text-transparent' style={{ fontSize: "36px" }}>About Me</span>
                    <p className='text-lg font-bold'>Hey there, I'm Vishesh</p>
                    <p className='text-sm'>I am a passionate and dedicated software developer with a strong background in full-stack development. My goal is to create impactful and user-friendly applications that help people solve real-world problems. With a deep love for coding and problem-solving, I built this platform to help developers like you improve their skills and prepare for technical interviews.</p>
                    <p className='font-bold text-lg'>Skills and Technologies</p>
                    <div className='flex flex-row justify-start items-center gap-3'>
                        <FaHtml5 size={25} title='HTML' />
                        <FaCss3Alt size={25} />
                        <FaJs size={25} />
                        <FaReact size={25} />
                        <SiDjango size={25} />
                        <BiLogoTailwindCss size={25} />
                    </div>
                    <p className='font-bold text-lg'>Connect with me</p>
                    <div className='flex flex-row justify-start items-center gap-3'>
                        <Link to="https://www.linkedin.com/in/visheshdvivedi/" target="_blank" rel='noreferrer noopener' >
                            <FaLinkedin size={25} />
                        </Link>
                        <Link to="https://github.com/visheshdvivedi" target="_blank" rel='noreferrer noopener'>
                            <FaGithub size={25} />
                        </Link>
                        <Link to="mailto:visheshdvivedi@zohomail.eu" target="_blank" rel='noreferrer noopener'>
                            <BiLogoGmail size={25} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutDeveloperSection