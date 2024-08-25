import React from 'react';

import InfoDiv from "./InfoDiv";
import SolutionDiv from './SolutionDiv';
import SubmissionsDiv from "./SubmissionsDiv";

const TabsDiv = ({ problem, codeSubmitting, preview = false }) => {

    const [selectedTab, setSelectedTab] = React.useState(0);

    React.useEffect(() => {
        if (codeSubmitting === true) {
            setSelectedTab(2);
        }
    }, [codeSubmitting]);

    if (problem === null)
        return null;

    return (
        <div className='w-full flex flex-col gap-3'>
            <div className='w-full text-sm px-3 py-2 flex flex-row gap-5'>
                <button className={`${ selectedTab === 0 ? "text-white border-b-2 border-white " : "text-slate-400" } px-3 py-2 hover:text-white`} onClick={() => setSelectedTab(0)}>Description</button>
                <button className={`${ selectedTab === 1 ? "text-white border-b-2 border-white " : "text-slate-400" } px-3 py-2 hover:text-white`} onClick={() => setSelectedTab(1)}>Solution</button>
                <button className={`${ selectedTab === 2 ? "text-white border-b-2 border-white " : "text-slate-400" } px-3 py-2 hover:text-white`} onClick={() => setSelectedTab(2)}>Submissions</button>
            </div>
            <div className={`flex-1 overflow-auto ${ selectedTab != 0 && "hidden" }`}>
                <InfoDiv problem={problem} />
            </div>
            <div className={`flex-1 overflow-auto ${ selectedTab != 1 && "hidden" }`}>
                { problem.solutions.map(solution => (
                    <SolutionDiv solution={solution} preview={preview} />
                )) }
            </div>
            <div className={`flex flex-col max-h-[500px] overflow-auto ${ selectedTab != 2 && "hidden" }`}>
                <SubmissionsDiv problem_id={problem.public_id} codeSubmitting={codeSubmitting} />
            </div>
        </div>
    )
}

export default TabsDiv