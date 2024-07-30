import React from 'react';
import CustomModal from "../../components/Modals";
import { BsQuestionCircle, BsTrash, BsPencil } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

const TestCaseSection = ({ data, errors, updateData }) => {

    // testcase inputs ref
    const nameInputRef = React.useRef();
    const typeInputRef = React.useRef();
    const valueInputRef = React.useRef();

    const tableHeaders = ["#", "name", "type", "value", "delete"];

    const [testCaseIndex, setTestCaseIndex] = React.useState(0);
    const [testcaseModalOpen, setTestCaseModalOpen] = React.useState(false);

    const addTestCase = () => {
        const newData = [...data];
        const newTestCase = { is_sample: true, inputs: [] };
        newData.push(newTestCase);
        updateData('testcases', newData);

        viewTestCase(newData.length - 1);
        setTestCaseModalOpen(true);
    }

    const removeTestCase = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        updateData('testcases', newData);
    }

    const viewTestCase = (index) => {
        setTestCaseIndex(index);
        setTestCaseModalOpen(true);
    }

    const getType = (int) => {
        if (int === 1)
            return "integer";
        else if (int === 2)
            return "string";
        else if (int === 3)
            return "integer array";
        else if (int === 4)
            return "string array";
    }

    const addTestCaseInput = () => {
        const name = nameInputRef.current.value.trim();
        const type = typeInputRef.current.value.trim();
        const value = valueInputRef.current.value.trim();

        if (!name.length) {
            alert("Input name cannot be empty");
            return;
        }
        if (!type.length) {
            alert("Input type cannot be empty");
            return;
        }
        if (!value.length) {
            alert("Input value cannot be empty");
            return;
        }

        const newData = [...data];
        const newTestCase = data[testCaseIndex];
        newTestCase.inputs.push({ name: name, type: parseInt(type), value: value })
        newData[testCaseIndex] = newTestCase;
        updateData('testcases', newData);

        nameInputRef.current.value = "";
        typeInputRef.current.value = "";
        valueInputRef.current.value = "";
    }

    const deleteTestCaseInput = (index) => {
        const newData = [...data];
        const newTestCase = data[testCaseIndex];
        newTestCase.inputs.splice(index, 1);
        newData[testCaseIndex] = newTestCase;
        updateData('testcases', newData);
    };

    const updateIsSample = (e, index) => {
        const newData = [...data];
        newData[index].is_sample = !newData[index].is_sample;
        updateData('testcases', newData);
    }

    return (
        <div className='flex w-full flex-col items-center justify-center gap-2'>
            <div className='w-[50%]'>
                <div className='flex flex-row justify-between items-center gap-2 mb-2'>
                    <div className='flex flex-row items-center gap-2'>
                        <label className="block text-sm font-medium dark:text-white">TestCases</label>
                        <a data-tooltip-id="problem-testcase-help" data-tooltip-content={"Create test cases to check performance of code"}>
                            <BsQuestionCircle size={10} />
                        </a>
                    </div>
                    <div className='flex flex-row justify-end items-center gap-2'>
                        <button onClick={addTestCase} className='px-2 py-1 bg-blue-600 rounded-lg'>
                            Add +
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-[50%] flex flex-col gap-2 text-sm text-red-600'>
                { errors.testcases.map((testcase) => (
                    <span>{testcase}</span>
                )) }
            </div>
            <div className='w-[50%] px-3 py-2 flex flex-col gap-3 bg-neutral-900'>
                <table className="min-w-full divide-y divide-gray-200 bg-neutral-900">
                    <thead className="bg-gray-50 dark:bg-neutral-900">
                        <tr>
                            <th scope="col" className="w-full px-6 py-3 text-start whitespace-nowrap">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Name
                                </span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200 flex flex-row items-center gap-2">
                                    Is Sample
                                    <a data-tooltip-id="testcase-issample-help" data-tooltip-content={"Whether the following test case is a visible or hidden test case"}>
                                        <BsQuestionCircle size={10}  />
                                    </a>
                                </span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Edit
                                </span>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                    Delete
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map((testcase, index) => (
                            <tr className='text-sm'>
                                <td className="size-px whitespace-nowrap px-6 py-3">
                                    Test Case #{index + 1}
                                </td>
                                <td className="size-px whitespace-nowrap px-6 py-3">
                                    <input type="checkbox" name="" id="" checked={testcase.is_sample} onChange={(e) => updateIsSample(e, index)} />
                                </td>
                                <td className="size-px whitespace-nowrap px-6 py-3">
                                    <button onClick={() => viewTestCase(index)} className='px-2 py-1 hover:text-blue-500'>
                                        <BsPencil size={15} />
                                    </button>
                                </td>
                                <td className="size-px whitespace-nowrap px-6 py-3">
                                    <button onClick={() => removeTestCase(index)} className='px-2 py-1 hover:text-red-500'>
                                        <BsTrash size={15} />
                                    </button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            <CustomModal open={testcaseModalOpen} title={"View Test Case"} content={(
                <div className='flex flex-col'>
                    <span className='text-xs text-gray-400 mb-2'>To specify output, create a variable by name 'output' (all small)</span>
                    <div className='flex flex-row gap-3'>
                        <input ref={nameInputRef} type="text" id="testcase-name-input" name="testcase-name" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none`} placeholder="Ex: nums" />
                        <select ref={typeInputRef} id="problem-difficulty" name="problem-difficulty" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none `}>
                            <option value="" selected disabled hidden>Select an option...</option>
                            <option value="1">Integer</option>
                            <option value="2">Array</option>
                            <option value="3">Integer Array</option>
                            <option value="4">String Array</option>
                        </select>
                        <input ref={valueInputRef} type="text" id="testcase-value-input" name="testcase-value" className={`py-3 px-4 block w-full shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900  dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 focus-visible:outline-none`} placeholder="Ex: [1, 2, 3]" />
                        <button onClick={addTestCaseInput} className='px-1 bg-blue-600 rounded-lg min-w-[75px]'>
                            Add +
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                        <thead className="bg-gray-50 dark:bg-neutral-800">
                            <tr>
                                {tableHeaders.map(head => (
                                    <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">
                                            {head}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                            { data[testCaseIndex]?.inputs.map((input, index) => (
                                <tr className='text-sm'>
                                    <td className="size-px whitespace-nowrap px-6 py-3">
                                        <span className="text-sm text-gray-800 dark:text-neutral-200">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="size-px whitespace-nowrap px-6 py-3">
                                        { input.name }
                                    </td>
                                    <td className="size-px whitespace-nowrap px-6 py-3">
                                        { getType(input.type) }
                                    </td>
                                    <td className="size-px whitespace-nowrap px-6 py-3">
                                        { input.value }
                                    </td>
                                    <td className="size-px whitespace-nowrap px-6 py-3">
                                        <button onClick={() => deleteTestCaseInput(index)} className='hover:text-red-500'>
                                            <BsTrash />
                                        </button>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            )} onClose={() => setTestCaseModalOpen(false)} />
            <Tooltip id="problem-testcase-help" place={'right'} style={{ fontSize: "12px" }} />
            <Tooltip id="testcase-issample-help" place={'right'} style={{ fontSize: "12px" }} />
        </div>
    )
}

export default TestCaseSection