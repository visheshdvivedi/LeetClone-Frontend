import React from 'react';
import { BsFillCircleFill } from 'react-icons/bs';

const TestResultsDiv = ({ problem, results, codeRunning }) => {

    const testcases = problem.testcases;
    const [selectedCase, setSelectedCase] = React.useState(0);

    const getStatusColor = (index) => {
        let output = testcases[index].inputs.find(input => input.name === "output");
        if (output.value !== results['submissions'][index].stdout)
            return "text-red-500"
        else
            return "text-emerald-500"
    }

    const getFinalStatus = () => {

        let success = true;
        let error = false;

        for (let i = 0; i < testcases.length; i++) {

            // check for runtime errors
            if (results['submissions'][i].stderr) {
                error = true;
            }

            // check incorrect message
            let output = testcases[i].inputs.find(input => input.name === "output")
            if (output.value !== results['submissions'][i].stdout)
                success = false;
        }

        if (error)
            return <span className='text-xl text-red-500'>Runtime Error</span>;
        else if (success)
            return <span className='text-xl text-emerald-500'>Accepted</span>;
        else
            return <span className='text-xl text-red-500'>Wrong Answer</span>;
    }

    const getAvgTime = () => {
        let sum = 0;
        let length = results['submissions'].length;
        for (let submission of results['submissions']) {
            sum += parseFloat(submission['time']);
        }
        return parseFloat(sum / length).toFixed(2);
    }

    if (codeRunning) {
        return (
            <div className='px-3 py-1 flex flex-col justify-center items-center py-10 gap-3'>
                <span className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                </span>
                <span>Loading</span>
            </div>
        )
    }
    else if (!results) {
        return (
            <div className='px-3 py-1 flex flex-col justify-center items-center py-10'>
                <span className='text-2xl'>No Results To Display</span>
                <span className='text-gray-400 text-sm'>Click on 'Run' to view results</span>
            </div>
        )
    }
    return (
        <div className='px-3 py-1'>
            {getFinalStatus()}
            <span className='text-sm text-gray-400 ms-2'>{ getAvgTime() } ms</span>
            <div className='flex flex-row gap-3 mt-5'>
                {results['submissions'].map((submission, index) => (
                    <button className={`px-2 py-1 rounded-lg text-sm flex flex-row justify-center hover:bg-neutral-700 items-center gap-1 ${selectedCase === index ? "bg-neutral-700" : "bg-neutral-800"}`} onClick={() => setSelectedCase(index)}>
                        <span>
                            <BsFillCircleFill className={getStatusColor(index)} size={5} />
                        </span>
                        <span>Case {index + 1}</span>
                    </button>
                ))}
            </div>
            <div className='flex flex-col gap-2 mt-3 overflow-y-scroll'>
                {testcases[selectedCase].inputs.map(input => (
                    <div className='flex flex-col text-sm'>
                        <span className='py-1 text-gray-400'>
                            <span>{input.name === "output" ? "Expected output" : input.name} = </span>
                        </span>
                        <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{input.value}</span>
                    </div>
                ))}
                {results['submissions'][selectedCase].stderr ? (
                    <div className='flex flex-col text-sm'>
                        <span className='py-1 text-gray-400'>Standard Error = </span>
                        <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{results['submissions'][selectedCase].stderr}</span>
                    </div>
                ) : results['submissions'][selectedCase].compile_output ? (
                    <div className='flex flex-col text-sm'>
                        <span className='py-1 text-gray-400'>Standard Error = </span>
                        <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{results['submissions'][selectedCase].compile_output}</span>
                    </div>
                ) : (
                    <div className='flex flex-col text-sm'>
                        <span className='py-1 text-gray-400'>Actual output = </span>
                        <span className='focus-visible:outline-none px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>
                            { results['submissions'][selectedCase].stdout?.split("\\n").map(line => (
                                <span>{line}</span>
                            )) }
                        </span>
                    </div>  
                )}
            </div>
        </div>
    )
}

export default TestResultsDiv