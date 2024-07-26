import React from 'react';

import Sidebar from "./Sidebar";
import { GlobalSearchBar } from '../../components/Inputs';
import { NotificationDropdown } from '../../components/Dropdown';
import { AiOutlineSetting } from 'react-icons/ai';

const Topbar = () => {
    return (
        <div className='w-full flex flex-row justify-between items-center gap-10'>
            <GlobalSearchBar placeholder={"Search problems, profiles etc."} />
            <div className='flex flex-row justify-between items-center'>
                <NotificationDropdown />
            </div>  
        </div>
    )
}

export default Topbar