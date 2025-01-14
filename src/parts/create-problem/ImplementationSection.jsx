import React, { useState } from 'react'
import { Editor } from '@monaco-editor/react';
import { DiJavascript, DiJava, DiPython } from 'react-icons/di';

import { toast } from 'react-toastify';
import { TOAST_CONFIG } from '../../Constants';
import { getAllLanguagesService } from '../../services/language';

const ImplementationSection = ({ data, errors, updateData }) => {

    const [tab, setTab] = React.useState("python");
    const [languages, setLanguages] = React.useState(null);
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

    const updateTab = (value) => {
        setTab(value);
        const model = editorVars.editor.getModel();
        monaco.editor.setModelLanguage(model, value);
    }

    const updateCodeValue = (value) => {
        if (languages === null)
            return;

        const lang = languages.find(lang => lang.name === tab)
        if (!lang)
            return

        updateData(lang.public_id, value);
    }

    const updateLanguages = async () => {
        const resp = await getAllLanguagesService();
        if (!resp.status) {
            toast.error('Failed to retrieve languages', TOAST_CONFIG);
            return;
        }
        else {
            setLanguages(resp.json);
        }
    }

    const getValue = () => {
        if (!languages) {
            return "";
        }
        const lang_id = languages.find(lang => lang.name === tab).public_id;
        console.log(lang_id);

        
        const value = data.find(imp => imp.language === lang_id).value;
        console.log(value);

        return value;
    }

    React.useEffect(() => {
        updateLanguages();
    }, []);

    return (
        <div className='w-full flex flex-col justify-between items-center gap-5'>
            <div className='w-[50%]'>
                <div className='flex flex-row justify-start items-center gap-5'>
                    <button onClick={() => updateTab('python')} className={`flex flex-row gap-2 items-center px-3 py-2 hover:border-b-2 hover:border-gray-500 text-sm ${tab === 'python' ? 'border-b-2 border-white' : ''}`}>
                        <DiPython />
                        Python 3
                    </button>
                    <button onClick={() => updateTab('java')} className={`flex flex-row gap-2 items-center px-3 py-2 hover:border-b-2 hover:border-gray-500 text-sm ${tab === 'java' ? 'border-b-2 border-white' : ''}`}>
                        <DiJava />
                        Java
                    </button>
                    <button onClick={() => updateTab('javascript')} className={`flex flex-row gap-2 items-center px-3 py-2 hover:border-b-2 hover:border-gray-500 text-sm ${tab === 'javascript' ? 'border-b-2 border-white' : ''}`}>
                        <DiJavascript />
                        JavaScript
                    </button>
                </div>
            </div>
            <div className='w-[50%]'>
                <Editor value={getValue()} onChange={(val) => updateCodeValue(val)} height={"20rem"} className='flex-1' options={{
                    quickSuggestions: false,
                    wordBasedSuggestions: false
                }} theme='vs-dark' onMount={onEditorMount} defaultLanguage={tab} defaultValue={""} />
            </div>
        </div>
    )
}

export default ImplementationSection