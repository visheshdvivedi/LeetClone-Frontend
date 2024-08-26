import React from 'react';

import Header from "../parts/Header";
import Footer from "../parts/Footer";
import Topbar from '../parts/dashboard/Topbar';
import CardList from '../parts/dashboard/CardList';
import ActivityTable from '../parts/dashboard/ActivityTable';
import RecommendedTable from '../parts/dashboard/RecommendedTable';

import CustomModal from "../components/Modals";
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {

    const { user } = React.useContext(AuthContext);
    const [openActivityModal, setOpenActivityModal] = React.useState(false);
    const [openRecommendModal, setOpenRecommendModal] = React.useState(false);

    React.useEffect(() => {
        if (openActivityModal === true) {
            window.scroll(0, 0);
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
        }
        else {
            document.getElementsByTagName("html")[0].style.overflow = "visible";
        }
    }, [openActivityModal]);

    React.useEffect(() => {
        if (openRecommendModal === true) {
            window.scroll(0, 0);
            document.getElementsByTagName("html")[0].style.overflow = "hidden";
        }
        else {
            document.getElementsByTagName("html")[0].style.overflow = "visible";
        }
    }, [openRecommendModal]);

    return (
        <div className='w-full h-full bg-slate-200 dark:bg-black flex flex-col justify-center items-center px-6 sm:px-12 gap-5'>
            <Header />
            {/* <Topbar /> */}
            <div className='w-full flex flex-row justify-start'>
                <span className='font-bold text-xl dark:text-white'>Welcome, { user.first_name }</span>
            </div>
            <CardList />
            <ActivityTable onClickAll={() => setOpenActivityModal(true)} />
            <RecommendedTable pagination={false} onClickAll={() => setOpenRecommendModal(true)} pageSize={7} />
            <Footer />
            <CustomModal open={openActivityModal} title={"Recent Submissions"} onClose={() => setOpenActivityModal(false)} content={<ActivityTable pagination={true} header={false} pageSize={8} />} />
            <CustomModal open={openRecommendModal} title={"Recommended Problems"} onClose={() => setOpenRecommendModal(false)} content={<RecommendedTable pagination={true} header={false} pageSize={8} />} />
        </div>
    )
}

export default DashboardPage