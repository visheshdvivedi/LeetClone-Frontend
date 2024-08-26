import React from 'react'
import { useNavigate } from 'react-router-dom';

import notFoundImage from '../assets/404_image.jpg';

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className='fixed w-full h-full bg-white flex flex-col justify-center items-center gap-2'>
            <img src={notFoundImage} alt="" width={600} />
            <span className='font-bold text-4xl'>Not Found</span>
            <span className='text-sm text-center'>The page you have been looking for cannot be found.</span>
            <button onClick={() => navigate("/")} className='text-white bg-blue-600 px-3 py-2 rounded-md'>
                Go back to home page 
            </button>
        </div>
    )
}

export default NotFoundPage