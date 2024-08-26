import React from 'react';
import { GlobalSearchBar } from '../../components/Inputs';
import { TagMultiSelectDropdown } from '../../components/Dropdown';

import { listTagService } from '../../services/tags';
import RecommendedTable from '../dashboard/RecommendedTable';
import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../Constants';

const SearchFilters = () => {

    let [tagOptions, setTagOptions] = React.useState([
        "array", "sorting", "searching", "graphs", "math"
    ]);

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

    const getTags = async () => {
        const resp = await listTagService();
        if (!resp.status) {
            toast.error(resp.json.message, TOAST_CONFIG);
            return;
        }
        else {
            const tagList = resp.json.map(entry => entry.name);
            setTagOptions(tagList);
        }
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

    React.useEffect(() => {
        getTags();
    }, []);

    return (
        <div className='px-5 py-4 flex flex-col gap-3'>
            <span className='text-2xl dark:text-gray-300'>Search Problems</span>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

                <div className='flex-1 w-full'>
                    <GlobalSearchBar value={search} setValue={updateSearch} />
                </div>
                <div className='flex-1 w-full flex flex-row sm:justify-end gap-3 text-sm'>
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