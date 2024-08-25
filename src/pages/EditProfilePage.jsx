import React from 'react'
import "./EditProfilePage.css";

import Header from '../parts/Header'
import Footer from '../parts/Footer'

import { FaCamera } from 'react-icons/fa';

const EditProfilePage = () => {

    const fileUploadRef = React.useRef();
    const profilePicRef = React.useRef();

    const triggerFileUpload = () => {
        fileUploadRef.current.click();
    }

    const updateProfilePic = (event) => {
        profilePicRef.current.src = URL.createObjectURL(event.target.files[0]);
    }

    return (
        <>
            <Header />
            <div className='px-5 py-4 w-full h-full flex flex-row justify-center items-center gap-10'>

                <div className='px-5 py-4 dark:bg-neutral-800 min-w-[600px] border-t-2 border-neutral-600 flex flex-col dark:text-white items-center gap-5'>
                    <span className='text-2xl font-bold dark:text-gray-400'>Edit Profile Page</span>
                    <div className='relative'>
                        <div className='absolute opacity-0 hover:opacity-70 min-w-[200px] min-h-[200px] bg-neutral-800 flex flex-col justify-center items-center gap-2' onClick={triggerFileUpload}>
                            <FaCamera />
                            <span className='text-sm'>Change Picture</span>
                            <input type="file" accept='.png,.jpg,.jpeg' className='hidden' ref={fileUploadRef} onChange={updateProfilePic} />
                        </div>
                        <img src="./profile_pic.png" width="200" height="200" alt="profile picture" className='rounded-lg border-2 border-white max-w-[200px] max-h-[200px]' ref={profilePicRef} />
                    </div>

                    <div className='w-full flex flex-col justify-between items-center gap-5 px-10'>
                        <div className='flex flex-row items-center w-full gap-10'>
                            <span className='dark:text-gray-400 basis-1/4 '>Email</span>
                            <input type="email" name="" id="" className='basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white ' />
                        </div>
                        <div className='flex flex-row items-center w-full gap-10'>
                            <span className='dark:text-gray-400 basis-1/4 '>Username</span>
                            <input type="text" name="" id="" className='basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white ' />
                        </div>
                        <div className='flex flex-row items-center w-full gap-10'>
                            <span className='dark:text-gray-400 basis-1/4 '>Password</span>
                            <input type="password" name="" id="" className='basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white ' />
                        </div>
                        <div className='flex flex-row items-center w-full gap-10'>
                            <span className='dark:text-gray-400 basis-1/4 '>Confirm Password</span>
                            <input type="password" name="" id="" className='basis-3/4 rounded-lg dark:bg-neutral-700 focus-visible:outline-none px-2 py-1 dark:text-white ' />
                        </div>
                    </div>

                    <div className='flex flex-row items-center gap-5 w-full'>
                        <button className='flex-1 px-3 py-2 bg-orange-600 rounded-lg hover:bg-orange-700'>Save</button>
                        <button className='flex-1 px-3 py-2 bg-neutral-700 hover:bg-neutral-900 rounded-lg'>Cancel</button>
                    </div>

                </div>

            </div>
            <Footer />
        </>
    )
}

export default EditProfilePage