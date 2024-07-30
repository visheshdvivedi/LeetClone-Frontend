import React from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';
import TagsMultiSelect from './TagsMultiSelect';

const TagsSection = ({ data, errors, updateData }) => {

    const popularTags = [
        "array",
        "string",
        "hash table",
        "dynamic programming",
        "depth-first search",
        "breadth-first search",
        "binary search",
        "sorting",
        "greedy",
        "two pointers",
        "stack",
        "backtracking",
        "linked list",
        "tree",
        "graph",
        "binary tree",
        "matrix",
        "bit manipulation",
        "heap (priority queue)",
        "union find",
        "sliding window",
        "design",
        "trie",
        "divide and conquer",
        "recursion",
        "segment tree",
        "binary indexed tree",
        "queue",
        "topological sort",
        "memoization",
        "enumeration",
        "geometry",
        "game theory",
        "minimum spanning tree",
        "shortest path",
        "combinatorics",
        "simulation",
        "data stream",
        "interactive"
    ];

    const addTag = (tag) => {
        updateData('tags', [...data, tag]);
    }

    const removeTag = (tag) => {
        const prevList = [...data];
        const index = prevList.indexOf(tag);
        if (index != -1) {
            prevList.splice(index, 1);
            updateData('tags', [...prevList]);
        }
    }

    React.useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <div className='w-full flex flex-col justify-between items-center gap-5'>
            <div className='w-[50%]'>
                <div className='flex flex-row items-center gap-2 mb-2'>
                    <label className="block text-sm font-medium dark:text-white">Problem Tags</label>
                    <a data-tooltip-id="problem-tags-help" data-tooltip-content={"Type the tag and hit 'Enter'"}>
                        <BsQuestionCircle size={10} />
                    </a>
                </div>
                <TagsMultiSelect tags={data} errors={errors} updateData={updateData} />
                <p className={`${errors.tags.length ? "" : "hidden"} text-xs text-red-600 mt-2`} id="problem-name-error">{errors.tags.join(" | ")}</p>
            </div>

            <div className='w-[50%] flex flex-wrap gap-3 bg-neutral-900 px-3 py-2'>
                { popularTags.map(tag => {
                    if (data.includes(tag)) {
                        return (
                            <span onClick={() => removeTag(tag)} className='cursor-pointer text-xs px-2 py-1 bg-blue-600'>{ tag }</span>
                        )
                    }
                    else {
                        return (
                            <span onClick={() => addTag(tag)} className='cursor-pointer text-xs px-2 py-1 bg-neutral-700'>{ tag }</span>
                        )
                    }
                }) }
            </div>

            <Tooltip id="problem-tags-help" place={'right'} style={{ fontSize: "12px" }} />
        </div>
    )
}

export default TagsSection