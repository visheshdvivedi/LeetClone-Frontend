import React from 'react';
import { GlobalSearchBar } from '../../components/Inputs';
import { TagMultiSelectDropdown } from '../../components/Dropdown';
import RecommendedTable from '../dashboard/RecommendedTable';

const SearchFilters = () => {

    const tagOptions = [
        "array", "sorting", "searching", "graphs"
    ];

    return (
        <div className='px-5 py-4 flex flex-col gap-3'>
            <span className='text-2xl dark:text-gray-300'>Search Problems</span>
            <div className='flex flex-row justify-start items-center gap-4'>

                <div className='flex-1'>
                    <GlobalSearchBar />
                </div>
                <div className='flex-1 flex flex-row justify-end gap-3 text-sm'>
                    <select defaultValue={""} className='px-2 py-2 bg-neutral-700 border-r-8 rounded-lg border-neutral-700 text-white focus-visible:outline-none'>
                        <option value="">All Difficulty</option>
                        <option value="">School</option>
                        <option value="">Easy</option>
                        <option value="">Medium</option>
                        <option value="">Hard</option>
                    </select>
                    <TagMultiSelectDropdown options={tagOptions} />
                </div>
            </div>
            <RecommendedTable header={false} pagination={true} pageSize={10} />
        </div>
    )
}

export default SearchFilters