import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

import { AiOutlineBell } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const ProfileDropdown = ({ user, pic }) => {

    const navigate = useNavigate();
    const { logout } = React.useContext(AuthContext);

    const [opened, setOpened] = React.useState(false);
    const links = [
        {
            label: "My Profile",
            href: "/profile"
        },
        {
            label: "Settings",
            href: "/settings"
        },
        {
            label: "Logout",
            href: "/logout"
        }
    ]

    const onLogoutClick = () => {
        logout();
        navigate("/");
    }

    React.useEffect(() => {
        const container = document.getElementById("profile-pic-container");
        document.addEventListener("mouseup", (e) => {
            if (!container.contains(e.target)) {
                setOpened(false);
            }
        })
    }, []);

    return (
        <>
            <button onClick={() => setOpened(!opened)} id="hs-dropdown-example" type="button" className=''>
                <img src={pic} alt="profile picture" className='rounded-full' width={25} />
            </button>

            <div id="profile-pic-container" className={`${opened ? "" : "hidden"} absolute right-15 top-12 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 w-56 z-20 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" aria-labelledby="hs-dropdown-example`}>
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 font-bold" href="/profile">
                    {user.username}
                </a>
                {/* <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 font-bold" href="/create-problem">
                    Add a new problem
                </a> */}
                <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700" onClick={onLogoutClick} >
                    Logout
                </a>
            </div>
        </>
    )
}

export const NotificationDropdown = () => {

    const navigate = useNavigate();

    const [opened, setOpened] = React.useState(false);
    const notifications = [
        {
            time: "2h ago",
            title: "New problem released",
            content: "Try out the 'Find Smallest Element' problem",
            href: "/problem/123"
        },
        {
            time: "2h ago",
            title: "New problem released",
            content: "Try out the 'Find Smallest Element' problem",
            href: "/problem/123"
        }
    ]

    React.useEffect(() => {
        const container = document.getElementById("notification-container");
        document.addEventListener("mouseup", (e) => {
            if (!container.contains(e.target)) {
                setOpened(false);
            }
        })
    }, []);

    return (
        <>
            <div className="px-3">
                <strong className="relative inline-flex items-center rounded px-2.5 py-1.5 text-xs font-medium">
                    {notifications.length > 0 && (
                        <span className="absolute h-5 w-5 rounded-full bg-red-500 text-white flex justify-center items-center items" style={{ fontSize: "8px", top: "0px", right: "3px" }}>
                            <span>{notifications.length}</span>
                        </span>
                    )}
                    <button onClick={() => setOpened(!opened)} id="hs-dropdown-example" type="button" className='rounded-full p-1 hover:bg-slate-100 dark:hover:bg-neutral-500 p-1 dark:text-white'>
                        <AiOutlineBell size={25} />
                    </button>
                    <div id="notification-container" className={`${opened ? "" : "hidden"} absolute right-0 top-10 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 w-96 z-20 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" aria-labelledby="hs-dropdown-example flex flex-col gap-3 dark:text-white`}>

                        {notifications.map((notif, index) => (
                            <>
                                <div className='px-2 py-1 rounded-lg flex flex-col gap-2'>
                                    <span className='text-xs text-gray-400'>{notif.time}</span>
                                    <span className='hover:underline' onClick={() => { navigate(notif.href) }} style={{ fontSize: "16px" }}>{notif.title}</span>
                                    <span className='font-normal'>{notif.content}</span>
                                </div>
                                {index === notifications.length - 1 ? "" : <hr className='border-gray-300 dark:border-neutral-500' />}
                            </>
                        ))}

                    </div>
                </strong>
            </div>
        </>
    )
}

export const TagMultiSelectDropdown = ({ options, updateOptions }) => {

    const [opened, setOpened] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [selectedTags, setSelectedTags] = React.useState([]);

    const toggleSelectedTag = (name) => {
        const newTags = [...selectedTags];
        if (newTags.includes(name)) {
            newTags.splice(newTags.indexOf(name), 1);
        }
        else {
            newTags.push(name);
        }
        setSelectedTags(newTags);
        updateOptions(newTags);
    }

    const getTags = () => {
        return options.filter(option => option.includes(search));
    }

    React.useEffect(() => {
        const container = document.getElementById("tag-filter-container");
        document.addEventListener("mouseup", (e) => {
            if (!container.contains(e.target)) {
                setOpened(false);
            }
        })
    }, []);

    return (
        <>
            <button onClick={() => setOpened(!opened)} id="hs-dropdown-example" type="button" className='px-3 py-2 dark:text-white dark:bg-neutral-700 rounded-lg flex flex-row justify-center items-center gap-2'>
                Tags <span className='text-xs'>{ selectedTags.length }</span>
                { <IoIosArrowDown /> }
            </button>

            <div id="tag-filter-container" className={`${opened ? "" : "hidden"} absolute right-15 top-60 sm:top-36 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 w-56 z-20 mt-2 min-w-60 bg-white shadow-md rounded-lg p-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700" aria-labelledby="hs-dropdown-example`}>
                <input type="text" className='rounded-lg bg-slate-100 dark:bg-neutral-700 dark:text-white w-full focus-visible:outline-none px-2 text-xs px-3 py-2' value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className='mt-2 flex flex-wrap gap-2'>
                    { getTags().map(option => (
                        <button onClick={() => toggleSelectedTag(option)} className={` px-2 py-1 rounded-lg ${selectedTags.includes(option) ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-neutral-700 dark:text-gray-400"}`}>{option}</button>
                    )) }
                </div>    
            </div>
        </>
    )
}