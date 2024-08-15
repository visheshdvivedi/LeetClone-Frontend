import React from 'react';
import { GlobalSearchBar } from '../../components/Inputs';
import { TagMultiSelectDropdown } from '../../components/Dropdown';
import RecommendedTable from '../dashboard/RecommendedTable';

const SearchFilters = () => {

    let tagOptions = [
        "array", "sorting", "searching", "graphs", "math"
    ];

    const [search, setSearch] = React.useState("");
    const [filters, setFilters] = React.useState({
        search: "",
        difficulty: "",
        tags: ""
    });

    const updateSearch = (value) => {
        setSearch(value);
    }

    const updateTags = (tags) => {
        const val = tags.join(",");
        setFilters({
            ...filters,
            tags: val
        })
    }

    React.useEffect(() => {
        const typingTimer = setTimeout(() => {
            setFilters({
                ...filters,
                search: search
            })
        }, 1000);
        return () => clearTimeout(typingTimer);
    }, [search]);

    return (
        <div className='px-5 py-4 flex flex-col gap-3'>
            <span className='text-2xl dark:text-gray-300'>Search Problems</span>
            <div className='flex flex-row justify-start items-center gap-4'>

                <div className='flex-1'>
                    <GlobalSearchBar value={search} setValue={updateSearch} />
                </div>
                <div className='flex-1 flex flex-row justify-end gap-3 text-sm'>
                    <select value={filters.difficulty} onChange={(e) => setFilters({...filters, difficulty: e.target.value})} className='px-2 py-2 bg-transparent dark:bg-neutral-700 border-r-8 rounded-lg border-transparent dark:border-neutral-700 dark:text-white focus-visible:outline-none'>
                        <option value="">All Difficulty</option>
                        <option value={0}>School</option>
                        <option value={1}>Easy</option>
                        <option value={2}>Medium</option>
                        <option value={3}>Hard</option>
                    </select>
                    <TagMultiSelectDropdown options={tagOptions} updateOptions={updateTags} />
                </div>
            </div>
            <RecommendedTable header={false} pagination={true} pageSize={10} filters={filters} />
        </div>
    )
}

export default SearchFilters