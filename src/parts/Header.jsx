import React from 'react'
import { useNavigate } from 'react-router-dom';

import icon from "../assets/icon.png";
import { AuthContext } from '../contexts/AuthContext'
import { IoMoon, IoSunny } from 'react-icons/io5';

const Header = () => {

    const links = [
        {
            name: 'Home',
            href: '/'
        },
        {
            name: 'Problem',
            href: '/problem'
        }
    ]
    const navigate = useNavigate();
    const { user } = React.useContext(AuthContext);
    const [darkMode, setDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        const isDark = !darkMode;
        const html = document.getElementsByTagName("html")[0];

        if (isDark) {
            html.classList.add("dark");
            localStorage.setItem("dark-theme", true);
        }
        else {
            html.classList.remove("dark");
            localStorage.setItem("dark-theme", false);
        }

        setDarkMode(!darkMode);
    }

    React.useEffect(() => console.log(darkMode), [darkMode]);
    React.useEffect(() => {
        const html = document.getElementsByTagName("html")[0];
        const isDark = localStorage.getItem("dark-theme");
        
        if (isDark === "true") {
            setDarkMode(true);
            html.classList.add("dark");
        }
        else {
            setDarkMode(false);
            html.classList.remove("dark");
        }
    }, []);

    return (
        <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-4 dark:bg-neutral-800 bg-slate-100">
            <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div class="flex items-center justify-between">
                    <img src={icon} width={15} className='me-2' />
                    <a class="flex-none text-xl font-semibold dark:text-white" href="#">LeetClone</a>
                    <div class="sm:hidden">
                        <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10" data-hs-collapse="#navbar-with-mega-menu" aria-controls="navbar-with-mega-menu" aria-label="Toggle navigation">
                            <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>
                <div id="navbar-with-mega-menu" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
                    <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                        
                        <button onClick={toggleDarkMode} className='px-2 py-1 dark:text-white'>
                            { darkMode ? <IoMoon size={20} /> : <IoSunny size={20} /> }
                        </button>

                        { links.map(link => (
                            <a class={`font-medium ${ window.location.pathname === link.href ? "text-blue-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-white" }`} href={link.href} aria-current="page">{ link.name }</a>
                        ))}

                        { user ? (
                            <>

                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate("/login")} className='px-2 py-1 outline outline-violet-600 rounded-md text-gradient-to-tl from-blue-600 to-violet-600 dark:text-white'>
                                    Login
                                </button>
                                <button className='inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-1 px-2 dark:focus:ring-offset-gray-800'>Register</button>
                            </>
                        ) }

                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header