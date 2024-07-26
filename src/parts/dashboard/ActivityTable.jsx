import React from 'react';

import { FaPython, FaJava } from 'react-icons/fa';
import { DiJavascript } from 'react-icons/di';

import { getRecentSubmissionsService } from '../../services/account';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../Constants';

const ActivityTable = ({ header = true, pagination = false, pageSize = 5, onClickAll }) => {

    const tableHeaders = ["#", "Problem", "Status", "Language", "Date"];
    const [ tableData, setTableData ] = React.useState([]);
    const [selectedPage, setSelectedPage] = React.useState(0);

    const getStatus = (status) => {
        let color = "";
        let darkColor = "";
        let tagText = "";

        if (status === 1){
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
            <span className="text-sm text-gray-800 dark:text-neutral-200 flex flex-row items-center gap-2">
                {icon}
                <span>{language}</span>
            </span>
        )
    }

    const getPages = () => {
        let pages = [];

        for (let i = 0; i < Math.ceil(tableData.length / pageSize); i++) {
            pages.push(
                <button type="button" class={`py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 ${selectedPage === i ? "bg-slate-300 dark:bg-neutral-500" : "bg-white text-gray-800 hover:bg-gray-50"} shadow-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800`} onClick={() => setSelectedPage(i)}>
                    {i + 1}
                </button>
            )
        }

        return pages;
    }

    const getData = () => {
        const start = (selectedPage) * pageSize;
        const end = start + pageSize;
        return tableData.slice(start, end);
    }

    const getPrevPage = () => {
        if (selectedPage === 0)
            return;

        setSelectedPage(selectedPage - 1);
    }

    const getNextPage = () => {
        const maxPage = Math.ceil(tableData.length / pageSize) - 1;
        if (selectedPage >= maxPage)
            return;

        setSelectedPage(selectedPage + 1);
    }

    const updateRecentSubmissions = async () => {
        const resp = await getRecentSubmissionsService();
        if (!resp.status) {
            toast.error(resp.status.message, TOAST_CONFIG);
        }
        else {
            setTableData(resp.json)
        }
    }   

    const getDate = (date) => {
        const d = new Date(date);
        return d.toDateString();
    }

    React.useEffect(() => {
        updateRecentSubmissions();
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">


                            {/* StartHeader */}
                            {header === true && (
                                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                            Recent Submissions
                                        </h2>
                                        <p className="text-sm text-gray-600 dark:text-neutral-400">
                                            View recent code submissions
                                        </p>
                                    </div>

                                    <div>
                                        <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" onClick={onClickAll}>
                                            View all
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* End Header */}

                            {/* Start Table */}
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
                                    {getData().map((data, index) => (
                                        <tr>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                    {index+1}
                                                </span>
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <a href={`/problem/${data.problem.public_id}`} className="hover:underline text-sm text-gray-800 dark:text-neutral-200">
                                                    {data.problem.name}
                                                </a>
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                {getStatus(data.status)}
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                {getLanguage(data.language.name)}
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <span className="text-sm text-gray-800 dark:text-neutral-200">
                                                    {getDate(data.date)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            {/* End Table */}

                            {/* Pagination Start */}
                            <div class="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700">
                                <div>
                                    <p class="text-sm text-gray-600 dark:text-neutral-400">
                                        <span class="font-semibold text-gray-800 dark:text-neutral-200">
                                            {tableData.length}
                                        </span> results
                                    </p>
                                </div>

                                <div className='flex flex-row justify-center items-center'>
                                    {pagination && (
                                        <>
                                            <div class="inline-flex gap-x-2">
                                                <button type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" onClick={getPrevPage}>
                                                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                                    Prev
                                                </button>
                                                {getPages()}
                                                <button type="button" class="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800" onClick={getNextPage}>
                                                    Next
                                                    <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Pagination End */}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityTable