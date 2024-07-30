import React from 'react';
import { BsX } from 'react-icons/bs';

const TagsMultiSelect = ({ tags, errors, updateData }) => {

    const inputRef = React.useRef();

    const onKeyPress = (e) => {
        if (e.code === "Enter") {
            addTag();
        }
    }

    const getLeftPadding = () => {
        let total = 10;
        for (let tag of tags) {
            total += tag.length + 2;
        }
        return total + "px";
    }

    const getOptionPosition = (index) => {
        let out = 15;
        if (index === 0)
            return out;
        
        for (let i=0; i<index; i++) {
            out += tags[i].length + 100; 
        }

        return out + "px";
    }

    const addTag = () => {
        let val = inputRef.current.value;
        if (val.trim().length === 0) {
            alert("Tag cannot be empty")
            return;
        }
        if (val != val.toLowerCase()) {
            alert("Tag cannot have uppercase character");
            return;
        }
        if (tags.includes(val)) {
            alert("Duplicate tags not allowed");
            return;
        }

        updateData('tags', [...tags, val]);

        inputRef.current.value = "";
    }

    const removeTag = (tag) => {
        const prevList = [...tags];
        prevList.splice(prevList.indexOf(tag), 1);
        updateData('tags', prevList);
    }

    return (
        <div className='flex flex-row justify-between items-center gap-3'>
            <div className='flex-1 flex-wrap flex flex-row gap-2 px-3 py-2 bg-neutral-900'>
                { tags.map(tag => (
                        <span className='bg-neutral-700 text-gray-400 px-2 text-sm flex flex-row items-center justify-between'>
                            { tag }
                            <button onClick={() => removeTag(tag)}>
                                <BsX className='hover:text-white' size={16} />
                            </button>
                        </span>
                    )) }
                <input ref={inputRef} onKeyDown={onKeyPress} className='flex-1 bg-neutral-900 focus-visible:outline-none ps-2' />
            </div>
        </div>
    )
}

export default TagsMultiSelect