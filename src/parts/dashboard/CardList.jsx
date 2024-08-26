import React from 'react'

import { getUserStatisticsService } from '../../services/account'
import { toast } from 'react-toastify'
import { TOAST_CONFIG } from '../../Constants'

const CardList = () => {

    const [stats, setStats] = React.useState(null);

    const updateUserStats = async () => {
        const resp = await getUserStatisticsService();
        if (!resp.status) {
            toast.error(resp.json.message, TOAST_CONFIG);
        }
        else {
            setStats(resp.json);
            console.log(resp.json);
        }
    }

    React.useEffect(() => {
        updateUserStats();
    }, []);

    if (!stats)
        return null;

    return (
        <div className='flex flex-col lg:flex-row  w-full'>
            <div className='bg-white px-7 py-10 flex flex-col justify-center items-center dark:bg-stone-700 dark:text-white rounded-l-lg'>
                <span>Total Problems Solved</span>
                <span className='font-bold bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 text-transparent' style={{ fontSize: "36px" }}>
                    { stats.solved.all }
                </span>
            </div>
            <div className='flex-1 grid grid-cols-1 sm:grid-cols-4 gap-5 bg-slate-100 border-2 border-slate-300 border-l-0 rounded-r-lg dark:bg-neutral-800 dark:border-neutral-600 px-5 py-5'>

                <div className="p-4 md:p-5 border-2 border-blue-600 rounded-lg flex-1 flex sm:items-start items-center flex-col">
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                            School
                        </p>
                    </div>

                    <h3 className="mt-2 text-2xl sm:text-3xl lg:text-3xl text-gray-800 dark:text-neutral-200">
                        <span className="font-semibold">
                            { stats.solved.school }
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                            &nbsp;/ { stats.total.school }
                        </span>
                    </h3>
                </div>


                <div className="p-4 md:p-5 border-2 border-emerald-600 rounded-lg flex-1 flex sm:items-start items-center flex-col ">
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                            Easy
                        </p>
                    </div>

                    <h3 className="mt-2 text-2xl sm:text-3xl lg:text-3xl text-gray-800 dark:text-neutral-200">
                        <span className="font-semibold">
                            { stats.solved.easy }
                        </span>
                        <span className="text-gray-500 dark:text-neutral-500">
                            &nbsp;/ { stats.total.easy }
                        </span>
                    </h3>
                </div>

                <div className="p-4 md:p-5 border-2 border-orange-600 rounded-lg flex-1 flex sm:items-start items-center flex-col ">
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                            Medium
                        </p>
                    </div>

                    <h3 className="mt-2 text-2xl sm:text-3xl lg:text-3xl text-gray-800 dark:text-neutral-200">
                        <span className="font-semibold">
                            { stats.solved.medium }
                        </span>
                        <span className="text-gray-500 dark:text-neutral-500">
                            &nbsp;/ { stats.total.medium }
                        </span>
                    </h3>
                </div>

                <div className="p-4 md:p-5 border-2 border-red-600 rounded-lg flex-1 flex sm:items-start items-center flex-col ">
                    <div className="flex items-center gap-x-2">
                        <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                            Hard
                        </p>
                    </div>

                    <h3 className="mt-2 text-2xl sm:text-3xl lg:text-3xl text-gray-800 dark:text-neutral-200">
                        <span className="font-semibold">
                            { stats.solved.hard }
                        </span>
                        <span className="text-gray-500 dark:text-neutral-500">
                            &nbsp;/ { stats.total.hard }
                        </span>
                    </h3>
                </div>

            </div>
        </div >
    )
}

export default CardList