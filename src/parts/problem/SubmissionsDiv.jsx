import React from 'react'

import { FaPython, FaJava } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';

import { retrieveSubmissionsService } from '../../services/problem';
import { TOAST_CONFIG } from '../../Constants';

import { BsClock } from 'react-icons/bs';
import { BsCpu } from 'react-icons/bs';

import { Editor } from '@monaco-editor/react';

const SubmissionsDiv = ({ problem_id, codeSubmitting }) => {


    const tableHeaders = ["#", "Status", "Language", "Runtime", "Memory"];
    const [tableData, setTableData] = React.useState([]);

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const getStatus = (status) => {
        let color = "";
        let darkColor = "";
        let tagText = "";

        if (status === 1) {
            color = "text-emerald-600"
            darkColor = "text-emerald-400"
            tagText = "Accepted";
        }
        else if (status === 2) {
            color = "text-red-600";
            darkColor = "text-red-400"
            tagText = "Rejected"
        }
        else {
            color = "text-red-600";
            darkColor = "text-red-400"
            tagText = "Runtime Error"
        }

        return (
            <span className={`text-sm ${darkColor}`}>
                {tagText}
            </span>
        )
    }

    const getLanguage = (language) => {
        let icon = null;

        if (language === "python")
            icon = <FaPython />;
        else if (language === "javascript")
            icon = <DiJavascript />
        else if (language === "java")
            icon = <FaJava />

        return (
            <span className="text-sm text-neutral-200 flex flex-row items-center gap-2">
                {icon}
                <span>{language}</span>
            </span>
        )
    }

    const updateSubmissionsList = async (displayLast) => {
        displayLast = displayLast || false;
        const resp = await retrieveSubmissionsService(problem_id);
        if (!resp.status) {
            toast.error(resp.json.message, TOAST_CONFIG);
        }
        else {
            setTableData(resp.json);
            if (displayLast) {
                setSelectedIndex(0);
            }
        }
    }

    const getFinalStatusText = () => {
        const submission = tableData[selectedIndex];

        if (submission.status === 1) {
            return <span className='text-xl text-emerald-500'>Accepted</span>;
        }
        else if (submission.status === 2) {
            return <span className='text-xl text-red-500'>Rejected</span>;
        }
        else {
            return <span className='text-xl text-red-500'>Runtime Error</span>;
        }
    }

    const updateCode = (code) => {
        let newCode = String(code).replace(/\\n/g, "\n");
        newCode = newCode.replaceAll(/\\t/g, "\t");
        return newCode
    }

    React.useEffect(() => {
        updateSubmissionsList();
    }, []);

    React.useEffect(() => {
        if (codeSubmitting === false) {
            updateSubmissionsList(true)
        }
    }, [codeSubmitting])

    if (codeSubmitting) {
        return (
            <div className='px-3 py-1 flex flex-col justify-center items-center py-10 gap-3'>
                <span className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                </span>
                <span>Loading</span>
            </div>
        )
    }
    else if (tableData.length && selectedIndex != null)
        return (
            <div className="px-5 py-2 flex flex-col shrink-0 gap-1 overflow-y-auto">
                <button className='text-start text-xs text-gray-400 hover:text-white' onClick={() => setSelectedIndex(null)}>Back to All Submissions</button>
                <span className={`text-xl ${tableData[selectedIndex].status === 1 ? "text-emerald-500" : "text-red-500"}`}>{tableData[selectedIndex].status === 1 ? "Accepted" : tableData[selectedIndex].status === 2 ? "Rejected" : "Runtime Error"}</span>
                <span className='text-gray-400 text-xs'>Submitted at <span className='text-white'>July 20, 2024 09:50</span></span>
                <div className='flex flex-row gap-3 mt-5'>
                    <div className='flex-1 px-5 py-4 bg-neutral-700 rounded-lg flex flex-col gap-3' >
                        <span className='text-sm flex flex-row items-center gap-2'>
                            <BsClock size={12} />
                            Runtime
                        </span>
                        <span className='text-2xl '>
                            {parseFloat(tableData[selectedIndex].time).toFixed(2)}
                            <span className='text-lg text-gray-400'> ms</span>
                        </span>
                    </div>
                    <div className='flex-1 px-5 py-4 bg-neutral-700 rounded-lg flex flex-col gap-3'>
                        <span className='text-sm flex flex-row items-center gap-2'>
                            <BsCpu size={12} />
                            Memory
                        </span>
                        <span className='text-2xl '>
                            {parseFloat(tableData[selectedIndex].memory / 1000).toFixed(2)}
                            <span className='text-lg text-gray-400'> MB</span>
                        </span>
                    </div>
                </div>
                <div>
                    <div className='flex flex-col gap-3 my-3'>
                        {tableData[selectedIndex].reject_details?.inputs?.map(input => {
                            if (input.name != "output") {
                                return (
                                    <div className='flex flex-col text-sm gap-2'>
                                        <span className='py-1 text-gray-400'>
                                            <span>{input.name} = </span>
                                        </span>
                                        <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{input.value}</span>
                                    </div>
                                )
                            }
                        })}
                        {tableData[selectedIndex].reject_details.inputs && (
                            <>
                                <div className='flex flex-col text-sm gap-2'>
                                    <span className='py-1 text-gray-400'>
                                        <span>Expected output = </span>
                                    </span>
                                    <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{tableData[selectedIndex].reject_details.expected_output}</span>
                                </div>
                                <div className='flex flex-col text-sm gap-2'>
                                    <span className='py-1 text-gray-400'>
                                        <span>Program output = </span>
                                    </span>
                                    <span className='px-3 py-2 bg-neutral-700 rounded-lg font-mono text-xs'>{tableData[selectedIndex].reject_details.original_output}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <span className='mt-2 text-sm text-gray-400 my-2'>Code | {tableData[selectedIndex].language.name}</span>
                <Editor defaultLanguage={tableData[selectedIndex].language.name} defaultValue={updateCode(tableData[selectedIndex].code)} theme='vs-dark' height="300px" options={{ readOnly: true }} />
            </div>
        )

    return (
        <div className="px-5 py-2 flex flex-col gap-5 h-[600px]" style={{ overflowY: "auto" }}>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">

                <thead className="bg-neutral-800">
                    <tr>
                        {tableHeaders.map(head => (
                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                <span className="text-xs font-semibold uppercase tracking-wide text-neutral-200">
                                    {head}
                                </span>
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                    {tableData.map((data, index) => (
                        <tr>
                            <td className="size-px whitespace-nowrap px-6 py-3">
                                <span className="text-sm text-neutral-200">
                                    {index + 1}
                                </span>
                            </td>
                            <td className="size-px whitespace-nowrap px-6 py-3">
                                <button onClick={() => setSelectedIndex(index)} className="hover:underline text-sm text-neutral-200">
                                    {getStatus(data.status)}
                                </button>
                            </td>
                            <td className="size-px whitespace-nowrap px-6 py-3 text-white">
                                {getLanguage(data.language.name)}
                            </td>
                            <td className="size-px whitespace-nowrap px-6 py-3 text-sm">
                                {parseFloat(data.time).toFixed(2)} ms
                            </td>
                            <td className="size-px whitespace-nowrap px-6 py-3 text-sm">
                                {parseFloat(data.memory / 100).toFixed(1)} MB
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default SubmissionsDiv