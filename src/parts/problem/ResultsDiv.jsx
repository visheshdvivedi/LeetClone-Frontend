import React from 'react';

import TestCaseDiv from './TestCaseDiv';
import TestResultsDiv from './TestResultsDiv';

const ResultsDiv = ({ problem, results, codeRunning }) => {

    const [selectedTab, setSelectedTab] = React.useState(0);

    React.useEffect(() => {
        if (codeRunning) {
            setSelectedTab(1);
        }
    }, [codeRunning]);

    return (

        <div className='w-full flex flex-col gap-3'>
            <div className='w-full text-sm px-3 py-2 flex flex-row gap-5'>
                <button className={`${selectedTab === 0 ? "text-white border-b-2 border-white " : "text-slate-400"} px-3 py-2 hover:text-white`} onClick={() => setSelectedTab(0)}>Test Cases</button>
                <button className={`${selectedTab === 1 ? "text-white border-b-2 border-white " : "text-slate-400"} px-3 py-2 hover:text-white`} onClick={() => setSelectedTab(1)}>Test Results</button>
            </div>
            <div className={`flex-1 overflow-auto ${selectedTab != 0 && "hidden"}`}>
                <TestCaseDiv problem={problem} />
            </div>
            <div className={`flex-1 overflow-auto ${selectedTab != 1 && "hidden"}`}>
                <TestResultsDiv problem={problem} results={results} codeRunning={codeRunning} />
            </div>
        </div>
    )
}

export default ResultsDiv