import React from 'react';
import { useParams } from 'react-router-dom';
import { MdDragIndicator, MdPlayArrow, MdUpload } from 'react-icons/md';

import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../Constants';

import TabsDiv from '../parts/problem/TabsDiv';
import EditorDiv from '../parts/problem/EditorDiv';
import ResultsDiv from "../parts/problem/ResultsDiv";

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { retrieveProblemService, runCodeService, submitCodeService } from '../services/problem';

const ProblemPage = () => {

    const { problemId } = useParams();
    const [problem, setProblem] = React.useState(null);

    const [code, setCode] = React.useState(null);
    const [languageId, setLanguageId] = React.useState(null);

    const [codeRunning, setCodeRunning] = React.useState(false);
    const [codeSubmitting, setCodeSubmitting] = React.useState(false);

    const [runResults, setRunResults] = React.useState(null);

    const getDifficulty = (difficulty) => {
        let color = null;
        let darkColor = null;
        let difficultyText = "";

        if (difficulty === 0) {
            color = "text-blue-400";
            difficultyText = "School";
        }
        else if (difficulty === 1) {
            color = "text-emerald-400";
            difficultyText = "Easy";
        }
        else if (difficulty === 2) {
            color = "text-orange-400";
            difficultyText = "Medium";
        }
        else if (difficulty === 3) {
            color = "text-red-400";
            difficultyText = "Hard";
        }

        return (
            <span className={`${color} dark:${darkColor}`}>
                {difficultyText}
            </span>
        )
    }

    const updateProblemDetails = async () => {
        const resp = await retrieveProblemService(problemId);
        if (!resp.status) {
            toast.error(resp.json.message, TOAST_CONFIG);
        }
        else {
            setProblem(resp.json);
        }
    }

    const runCode = async () => {
        setCodeRunning(true);
        const id = toast.loading("Running code ...");
        const resp = await runCodeService(problemId, languageId, code);

        if (!resp.status) {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: resp.json.message, type: "error" })
        }
        else {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: "Code executed successfully", type: "success" });
            setRunResults(resp.json);
        }

        setCodeRunning(false);
    }

    const submitCode = async () => {
        setCodeSubmitting(true);

        const id = toast.loading("Submitting code ...");
        const resp = await submitCodeService(problemId, languageId, code);

        if (!resp.status) {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: resp.json.message, type: "error" })
        }
        else {
            toast.update(id, { ...TOAST_CONFIG, isLoading: false, render: "Code executed successfully", type: "success" });
        }

        setCodeSubmitting(false);
    }

    React.useEffect(() => {
        updateProblemDetails();
    }, []);

    if (problem === null)
        return null;

    return (
        <div className='px-5 py-4 h-full bg-black text-white'>
            <div className='flex flex-row justify-between items-center gap-3'>
                <div className='flex flex-row justify-start items-center gap-3'>
                    <span className='text-xl font-bold text-white'>{problem.name}</span>
                    <span>{getDifficulty(problem.difficulty)}</span>
                </div>
                <div className='flex flex-row justify-end items-center gap-3'>
                    <a href="/dashboard" className='text-sm text-gray-400'>Back to Dashboard</a>
                </div>
            </div>

            <div className='h-[38rem] mt-5'>
                <PanelGroup direction='horizontal' className='flex flex-row'>
                    <Panel className='border-2 border-neutral-700 rounded-lg bg-neutral-800'>
                        <TabsDiv problem={problem} codeSubmitting={codeSubmitting} />
                    </Panel>
                    <PanelResizeHandle className='h-full flex flex-col justify-center cursor-col-resize'>
                        <MdDragIndicator />
                    </PanelResizeHandle>
                    <Panel className=''>
                        <PanelGroup direction='vertical'>
                            <Panel className='border-2  border-neutral-700 rounded-lg bg-neutral-800'>
                                <EditorDiv problem={problem} setCodeValue={setCode} setLanguage={setLanguageId} />
                            </Panel>
                            <PanelResizeHandle className='w-full flex flex-col items-center cursor-col-resize'>
                                <MdDragIndicator />
                            </PanelResizeHandle>
                            <Panel className='border-2 border-neutral-700 rounded-lg bg-neutral-800'>
                                <ResultsDiv problem={problem} results={runResults} codeRunning={codeRunning} />
                            </Panel>
                        </PanelGroup>
                    </Panel>
                </PanelGroup>
            </div>

            <div className='flex flex-row justify-center items-center gap-1 px-4 py-3'>
                <button className='flex flex-row gap-1 items-center bg-neutral-800 px-3 py-1 rounded-lg text-white hover:bg-neutral-700 disabled:bg-neutral-900' disabled={codeRunning} onClick={runCode}>
                    {codeRunning ? (<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>) : <MdPlayArrow />}
                    Run
                </button>
                <button className='flex flex-row gap-1 items-center bg-neutral-800 px-3 py-1 rounded-lg text-emerald-400 hover:bg-neutral-700' onClick={submitCode}>
                    {codeSubmitting ? (<svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>) : <MdUpload />}
                    Submit
                </button>
            </div>
        </div>
    )
}

export default ProblemPage