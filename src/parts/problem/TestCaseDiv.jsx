import React from 'react';

const TestCaseDiv = ({ problem }) => {

    const testcases = problem.testcases;
    const [selectedCase, setSelectedCase] = React.useState(0);

    return (
        <div className='px-3 py-1'>
            <div className='flex flex-row gap-3'>
                {testcases.map((testcase, index) => (
                    <button className={`px-2 py-1 rounded-lg text-sm flex flex-row justify-center hover:bg-neutral-700 items-center gap-1 ${selectedCase === index ? "bg-neutral-700" : "bg-neutral-800"}`} onClick={() => setSelectedCase(index)}>
                        <span>Case {index + 1}</span>
                    </button>
                ))}
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                {testcases[selectedCase].inputs.map(input => (
                    <div className='flex flex-col text-sm'>
                        <span className='py-1 text-gray-400'>{input.name} = </span>
                        <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{input.value}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TestCaseDiv