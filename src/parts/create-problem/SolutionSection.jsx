import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

const SolutionSection = ({ data, errors, updateData }) => {

    const updateSolution = (e, key) => {
        const newSol = { ...data };
        newSol[key] = e.target.value;
        updateData("solution", [newSol]);
    }

    return (
        <div className='w-full flex flex-col justify-between items-center gap-5'>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Solution Name</label>
                    <a data-tooltip-id="problem-solution-name-help" data-tooltip-content={"Provide a title for the solution"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                </div>
                <input type="text" id="problem-solution-name" name="problem-solution-name" className={`py-3 px-4 block w-full  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${errors.solution.name.length ? "border-2 border-red-600" : "dark:border-neutral-700"} `} placeholder="Ex: Linear Iternation" value={data.name} onChange={(e) => updateSolution(e, 'name')} />
                <p className={`${errors.solution.name.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.solution.name.join(" | ") }</p>
            </div>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Solution Intution</label>
                    <span className='text-xs text-gray-400'>(Markdown supported)</span>
                    <a data-tooltip-id="problem-difficulty-help" data-tooltip-content={"Click on 'Learn More' to view how to write problem intution"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                    <a href="#" className='text-sm text-blue-500 hover:underline'>Learn more</a>
                </div>
                <textarea id="problem-description" name="problem-description" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${ errors.solution.intuition.length ? "border-2 border-red-600" : "border-gray-200 dark:border-neutral-700" }`} placeholder={"The first intution will be to iterate through the array and check every element to find the smallest element."} rows={5} onChange={(e) => updateSolution(e, 'intution')}>
                    { data.intution }
                </textarea>
                <p className={`${errors.solution.intuition.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.solution.intuition.join(" | ") }</p>
            </div>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Solution Algorithm</label>
                    <a data-tooltip-id="problem-description-help" data-tooltip-content={"Click on 'Learn More' to view how to write a detailed problem description"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                    <a href="#" className='text-sm text-blue-500 hover:underline'>Learn more</a>
                </div>
                <textarea id="problem-description" name="problem-description" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none ${ errors.solution.algorithm.length ? "border-2 border-red-600" : "border-gray-200 dark:border-neutral-700" }`} placeholder={"1. Iterate through the array\n2. Compare each element with the smallest element\n3. Return the smallest element."} rows={5} onChange={(e) => updateSolution(e, 'algorithm')}>
                    { data.algorithm }
                </textarea>
                <p className={`${errors.solution.algorithm.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{ errors.solution.algorithm.join(" | ") }</p>
            </div>

            <Tooltip id="problem-name-help" place={'right'} style={{ fontSize: "12px" }} />
            <Tooltip id="problem-difficulty-help" place={'right'} style={{ fontSize: "12px" }} />
            <Tooltip id="problem-description-help" place={'right'} style={{ fontSize: "12px" }} />
        </div>
    )
}

export default SolutionSection