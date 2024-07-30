import React from 'react'
import { BiX } from 'react-icons/bi'

const CustomModal = ({ open, title, content, onClose }) => {
    return (
        <>
            <div className={`${open ? "opacity-70" : "opacity-0 -z-10"} bg-slate-400 size-full fixed top-0 left-0 flex flex-col justify-start items-center py-10 dark:bg-neutral-900 dark:text-white`} style={{ overflow: "none" }}>
            </div>
            <div className={`absolute top-10 px-4 py-3 rounded-lg min-w-[1200px] bg-white dark:bg-neutral-800 dark:text-white ${open ? "" : "hidden"}`} style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >

                {/* Modal Header */}
                <div className='flex flex-row w-full justify-between items-center'>
                    <span className='font-bold text-lg'>{title}</span>
                    <button onClick={onClose}>
                        <BiX size={25} className='text-slate-400 hover:text-black dark:hover:text-white' />
                    </button>
                </div>

                <hr className='mt-5 border-gray-300' />

                {/* Modal Content */}
                <div className='py-5'>
                { content }
                </div>

            </div>
        </>
    )
}

export default CustomModal