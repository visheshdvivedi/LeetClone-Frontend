import React from 'react';

import { Editor } from '@monaco-editor/react';
import Markdown from 'react-markdown';

const SolutionDiv = ({ solution, preview }) => {

    const implementations = solution.implementations;

    const [selectedLang, setSelectedLang] = React.useState("python");
    const [editorVars, setEditorVars] = React.useState({ monaco: null, editor: null });

    const onEditorMount = (editor, monaco) => {
        monaco.editor.EditorOptions.automaticLayout.defaultValue = true;
        monaco.editor.EditorOptions.readOnly.defaultValue = false;

        setEditorVars({
            ...editorVars,
            monaco: monaco,
            editor: editor
        })
    };

    React.useEffect(() => {
        if (!editorVars.monaco || !editorVars.editor)
            return;

        const monaco = editorVars.monaco;
        const editor = editorVars.editor;

        const code = implementations.find(implementation => implementation.language.name === selectedLang).value;

        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, selectedLang);
        model.setValue(code);

        editor.getAction('editor.action.formatDocument').run();

    }, [selectedLang]);

    return (
        <div className="px-5 py-4 flex flex-col gap-5 h-[600px]" style={{ overflow: "scroll" }}>
            <span className='text-xl font-bold'>Approach 1: { solution.name }</span>
            <span className='text-lg font-bold'>Intution</span>
            <span className='text-sm'>{ solution.intution }</span>
            <span className='text-lg font-bold'>Algorithm</span>
            <ol className='text-sm'>
                <Markdown>
                    { solution.algorithm }
                </Markdown>
            </ol>
            <span className='text-lg font-bold'>Code</span>
            <div>
                <div className='flex flex-row justify-start items-center'>
                    {implementations.map(implementation => (<button onClick={() => setSelectedLang(implementation.language.name)} className={`px-3 py-2 text-sm ${selectedLang === implementation.language.name ? "border-b-2 border-white" : ""}`}>{implementation.language.name}</button>))}
                </div>
                { preview ? (
                    <Editor onMount={onEditorMount} options={{ readOnly: true }} theme='vs-dark' height={"20rem"} defaultLanguage={selectedLang} defaultValue={implementations[0].value} />
                ) : (
                    <Editor onMount={onEditorMount} options={{ readOnly: true }} theme='vs-dark' height={"20rem"} defaultLanguage={selectedLang} defaultValue={implementations.find(implementation => implementation.language.name === selectedLang).value} />
                ) }
            </div>
        </div>
    )
}

export default SolutionDiv