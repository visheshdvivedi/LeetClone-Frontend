import React from "react";

import { FaSearch } from "react-icons/fa";

export const GlobalSearchBar = ({ placeholder, value, setValue }) => {

    var timer = null;
    var interval = 1000;

    const onTypingEnd = () => {
        console.log(`Search: ${value}`);
    }

    const onKeyUp = (e) => {
        if (timer != null)
            clearTimeout(timer);
        timer = setTimeout(onTypingEnd, interval);
    }

    const onKeyDown = (e) => {
        if (timer != null)
            clearTimeout(timer);
    }

    return (
        <div className="relative flex-1 w-full">
            <FaSearch className="absolute top-2.5 left-2 text-slate-300 dark:text-gray-400" />
            <input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={onKeyUp} onKeyDown={onKeyDown} className="px-8 py-2 rounded-lg w-full text-sm bg-white focus-visible:outline-none dark:bg-neutral-800 dark:text-stone-100" />
        </div>
    )
}