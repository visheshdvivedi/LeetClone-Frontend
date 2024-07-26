import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

    const navigate = useNavigate();

    return (
        <div className='fixed w-full h-full bg-slate-200 flex flex-col justify-center items-center gap-2'>
            <span className='font-bold' style={{ fontSize: "72px" }}>404</span>
            <span className='font-bold' style={{ fontSize: "36px" }}>Not Found</span>
            <span>The page you have been looking for cannot be found.</span>
            <button onClick={() => navigate("/")} className='text-white bg-blue-600 px-4 py-3 rounded-md'>
                Go back to home page 
            </button>
        </div>
    )
}

export default NotFoundPage