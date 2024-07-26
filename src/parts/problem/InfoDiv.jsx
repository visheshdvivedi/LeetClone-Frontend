import React from 'react';

import Markdown from 'react-markdown';

const InfoDiv = ({ problem }) => {

    const markdown = "Given an array `nums` of length `n`, find the smallest element present in `nums`. If the array is empty, return `Empty`."
    const examples = [
        {
            input: "nums = [3, 5, 1, 8, -2, 7], n = 6",
            output: "-2"
        },
        {
            input: "nums = [10, 20, 30, 5, 25], n = 5",
            output: "5"
        },
        {
            input: "nums = [5, 5, 5, 5, 5], n = 5",
            output: "5"
        },
        {
            input: "nums = [], n = 0",
            output: "\"Empty\""
        }
    ]
    const constraints = [
        "0 < n < 10^5",
        "-10^9 < nums[i] < 10^9"
    ]

    const getTestCaseInput = (inputs) => {
        const validInputs = inputs.filter(input => input.name !== "output");
        const output = [];
        for (let input of validInputs) {
            output.push(`${input.name} = ${input.value}`)
        }
        return output.join(", ");
    }

    const getTestCaseOutput = (inputs) => {
        const output = inputs.find(input => input.name === "output");
        return `${output.name} = ${output.value}`
    }

    const getConstraints = (input) => {
        if (input.includes(","))
            return input.split(",");
        return [input];
    }

    return (
        <div className="px-5 py-4 flex flex-col gap-5 overflow-y-scroll h-[550px]">
            <Markdown className={"font-mono text-xs text-gray-300 leading-5"}>{problem.description}</Markdown>
            <div className='text-sm flex flex-col gap-5 mt-5'>

                {problem.testcases.map((testcase, index) => (
                    <div className='flex flex-col gap-3'>
                        <span className='font-bold'>Example {index+1}: </span>
                        <div className='flex flex-row gap-3 font-mono text-xs'>
                            <div className='h-[40px] bg-neutral-500' style={{ paddingLeft: "1px" }}></div>
                            <div className='flex flex-col'>
                                <span><span className='font-bold'>Input: </span>{ getTestCaseInput(testcase.inputs) }</span>
                                <span><span className='font-bold'>Output: </span>{ getTestCaseOutput(testcase.inputs) }</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='mt-5 flex flex-col gap-3 items-start'>
                <span className='font-bold text-sm'>Constraints: </span>
                { getConstraints(problem.constraints).map(constraint => (
                    <span className='text-xs px-1 bg-neutral-700 text-gray-200 font-mono'>{ constraint }</span>
                )) }
            </div>
            <div className='flex flex-row text-xs gap-3'>
                <div className='flex flex-row'>
                    <span className='text-slate-400'>Accepted: </span>
                    <span className='font-bold'>&nbsp;{problem.accepted_submissions}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-slate-400'>Submissions: </span>
                    <span className='font-bold'>&nbsp;{problem.total_submissions}</span>
                </div>
                <div className='flex flex-row'>
                    <span className='text-slate-400'>Acceptance Rate: </span>
                    <span className='font-bold'>&nbsp;{problem.acceptance_percent}</span>
                </div>
            </div>
        </div>
    )
}

export default InfoDiv