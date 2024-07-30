import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

const ProblemDetailsSection = ({ data, errors, updateData }) => {

    return (
        <div className='w-full flex flex-col justify-between items-center gap-5'>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Problem Name</label>
                    <a data-tooltip-id="problem-name-help" data-tooltip-content={"Provide a small crips problem name that helps uniquely identify this problem"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                </div>
                <input type="text" id="problem-name" name="problem-name" className={`py-3 px-4 block w-full  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${errors.name.length ? "border-2 border-red-600" : "dark:border-neutral-700"} `} placeholder="Ex: Find Smallest Element" onChange={(e) => updateData('name', e.target.value)} value={data.name} />
                <p className={`${errors.name.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.name.join(" | ") }</p>
            </div>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Problem Difficulty</label>
                    <a data-tooltip-id="problem-difficulty-help" data-tooltip-content={"Click on 'Learn More' to view how to decide problem difficulty"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                    <a href="#" className='text-sm text-blue-500 hover:underline'>Learn more</a>
                </div>
                <select id="problem-difficulty" name="problem-difficulty" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${ errors.difficulty.length ? "border-2 border-red-600" : "border-gray-200 dark:border-neutral-700" } `} value={data.difficulty} onChange={(e) => updateData('difficulty', e.target.value)}>
                    <option value="" selected disabled hidden>Select an option...</option>
                    <option value="0">School</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                </select>
                <p className={`${errors.difficulty.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.difficulty.join(" | ") }</p>
            </div>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Problem Description</label>
                    <span className='text-xs text-gray-400'>(Markdown supported)</span>
                    <a data-tooltip-id="problem-description-help" data-tooltip-content={"Click on 'Learn More' to view how to write a detailed problem description"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                    <a href="#" className='text-sm text-blue-500 hover:underline'>Learn more</a>
                </div>
                <textarea id="problem-description" name="problem-description" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${ errors.description.length ? "border-2 border-red-600" : "border-gray-200 dark:border-neutral-700" }`} placeholder={"Given a array `nums` of size `n`, return the smallest element in an array.\n\nNote: array is unsorted and may have multiple occurences of the smallest element."} rows={5} onChange={(e) => updateData('description', e.target.value)}>
                    { data.description }
                </textarea>
                <p className={`${errors.description.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.description.join(" | ") }</p>
            </div>

            <Tooltip id="problem-name-help" place={'right'} style={{ fontSize: "12px" }} />
            <Tooltip id="problem-difficulty-help" place={'right'} style={{ fontSize: "12px" }} />
            <Tooltip id="problem-description-help" place={'right'} style={{ fontSize: "12px" }} />
        </div>
    )
}

export default ProblemDetailsSection