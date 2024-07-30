import React from 'react';
import { BsQuestionCircle, BsTrash } from 'react-icons/bs';

const ConstraintsSection = ({ data, errors, updateData }) => {

    const inputRef = React.useRef();

    const removeConstraint = (constraint) => {
        const prevData = [...data];
        const index = prevData.indexOf(constraint);
        if (index != -1) {
            prevData.splice(index, 1);
            updateData('constraints', prevData);
        }
    }

    const addConstraint = () => {
        const val = inputRef.current.value;
        if (val.trim().length === 0) {
            alert("Constraint cannot be empty");
            return;
        }
        if (data.includes(val.trim())) {
            alert("Constraints already exists");
            return;
        }
        inputRef.current.value = "";
        updateData('constraints', [...data, val]);
    }

    return (
        <div className='w-full flex flex-col justify-between items-center gap-5'>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Constraints</label>
                    <a data-tooltip-id="problem-name-help" data-tooltip-content={"Provide a small crips problem name that helps uniquely identify this problem"}>
                        <BsQuestionCircle size={10}  />
                    </a>
                </div>
                <div className='flex flex-row gap-3'>
                    <input ref={inputRef} type="text" id="problem-constraint" name="problem-naconstraintme" className={`py-3 px-4 block w-full  shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none font-mono`} placeholder="Ex: 0 <= n <= 10^6" />
                    <button onClick={addConstraint} className='w-[100px] px-1 bg-blue-600 rounded-lg'>
                        Add + 
                    </button>
                </div>
            </div>
            <div className='w-[50%] bg-neutral-900 px-3 py-2 flex flex-col gap-3'>
                { data.map(constraint => (
                    <div className='w-full flex flex-row justify-between items-center bg-neutral-800 px-3 py-2 rounded-lg'>
                        <span className='text-sm text-gray-400 font-mono'>{ constraint }</span>
                        <button onClick={() => removeConstraint(constraint)} className='text-gray-400 hover:text-red-600'>
                            <BsTrash />
                        </button>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default ConstraintsSection