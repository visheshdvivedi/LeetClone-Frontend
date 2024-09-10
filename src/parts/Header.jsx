import React from 'react'
import { useNavigate } from 'react-router-dom';

import icon from "../assets/icon.png";

import { BASE_URL } from '../Constants';

import { AuthContext } from '../contexts/AuthContext'
import { ProfileDropdown } from '../components/Dropdown';
import { getProfilePictureService } from '../services/account';

const Header = () => {

    const links = [
        {
            name: 'Landing',
            href: '/'
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: 'Problem',
            href: '/problems'
        }
    ]
    const navigate = useNavigate();
    const { isAuthenticated, user } = React.useContext(AuthContext);
    const [openNavbar, setOpenNavbar] = React.useState(true);
    const [profilePic, setProfilePic] = React.useState('/profile_pic.png');

    const updateProfilePicture = async () => {
        const resp = await getProfilePictureService();
        if (resp.status) {
            if (resp.json.profile_picture) {
                let pic = resp.json.profile_picture;
                if (pic.includes("/https%3A")) {
                    pic = pic.replace("/https%3A", "https://");
                    setProfilePic(pic);
                }
                else{
                    pic = BASE_URL + resp.json.profile_picture;
                    setProfilePic(pic);
                }
                console.log("Pic:", pic);
            }
        }
    }

    React.useEffect(() => { updateProfilePicture() });

    return (
        <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full text-sm py-4 bg-transparent">
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between">
                    <img src={icon} width={15} className='me-2' alt="profile-picture" />
                    <a className="flex-none text-xl font-semibold text-black dark:text-white" href="#">LeetClone</a>
                    <div className="sm:hidden">
                        <button type="button" className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10" data-hs-collapse="#navbar-with-mega-menu" aria-controls="navbar-with-mega-menu" aria-label="Toggle navigation" onClick={() => setOpenNavbar(!openNavbar)}>
                            <svg className="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg className="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>
                </div>
                <div id="navbar-with-mega-menu" className={`hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block ${openNavbar ? "hidden" : ""}`}>
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">

                        {/* <button onClick={toggleDarkMode} className='px-2 py-1 dark:text-white'>
                            {darkMode ? <IoMoon size={20} /> : <IoSunny size={20} />}
                        </button> */}

                        {links.map(link => (
                            <a className={`font-medium ${window.location.pathname === link.href ? "text-blue-400" : "text-gray-400 hover:text-gray-600 dark:hover:text-white"}`} href={link.href} aria-current="page">{link.name}</a>
                        ))}

                        {isAuthenticated() ? (
                            <>
                                <ProfileDropdown user={user} pic={profilePic} />
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate("/login")} className='px-2 py-1 outline outline-violet-600 rounded-md text-gradient-to-tl from-blue-600 to-violet-600 dark:text-white w-[98%] ms-1 sm:w-auto'>
                                    Login
                                </button>
                                <button onClick={() => navigate("/register")} className='inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-1 px-2 dark:focus:ring-offset-gray-800'>Register</button>
                            </>
                        )}

                    </div>
                </div>
            </nav>
        </header >
    )
}

export default Header