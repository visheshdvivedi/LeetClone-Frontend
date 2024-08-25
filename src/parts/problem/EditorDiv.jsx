import React from 'react';

import { Editor } from '@monaco-editor/react';
import { DiJavascript, DiPython, DiJava } from 'react-icons/di';
import { MdRefresh } from 'react-icons/md';

const EditorDiv = ({ problem, setCodeValue, setLanguage }) => {

    const [editor, setEditor] = React.useState(null);
    const [monaco, setMonaco] = React.useState(null);

    const [codes, setCodes] = React.useState(problem.defaultCode);
    const [defaultCodes, setDefaultCodes] = React.useState(problem.defaultCode);

    const [settings, setSettings] = React.useState({
        language: localStorage.getItem("preferred_lang") ? localStorage.getItem("preferred_lang") : problem.defaultCode[0].language.name
    });

    const updateSettings = (key, value) => {
        setSettings({
            ...settings,
            [key]: value
        })
    }

    const getLanguageIcon = () => {
        if (settings.language === "javascript")
            return <DiJavascript />
        else if (settings.language === "java")
            return <DiJava />
        else if (settings.language === "python")
            return <DiPython />
        return null;
    }

    const onEditorMount = (editor, monaco) => {
        monaco.editor.EditorOptions.automaticLayout.defaultValue = true;
        monaco.editor.EditorOptions.readOnly.defaultValue = false;

        setEditor(editor);
        setMonaco(monaco);
    };

    const setDefaultValue = () => {
        const defaultLangCode = defaultCodes.find(code => code.language.name === settings.language);
        if (!defaultLangCode){
            return "";
        }
        return defaultLangCode.value;
    }

    const updateCodeValue = (value) => {
        setCodeValue(value);
        setCodes(prevItems =>
            prevItems.map(item =>
              item.language.name === settings.language
                ? { ...item, value: value }
                : item
            )
        );

        let key = `${problem.public_id}_${settings.language}`
        localStorage.setItem(key, value);
    }

    const resetToDefaultCode = () => {
        const defaultLangCode = defaultCodes.find(code => code.language.name === settings.language);
        updateCodeValue(defaultLangCode.value);
        editor.getModel().setValue(defaultLangCode.value);
    }

    const getInitialCodeValue = () => {
        let key = `${problem.public_id}_${settings.language}`;
        let val = localStorage.getItem(key);
        if (val) return val;
        else codes[settings.language];
    }

    React.useEffect(() => {
        if (!editor || !monaco)
            return;

        const model = editor.getModel();
        monaco.editor.setModelLanguage(model, settings.language);

        const defaultLangCode = codes.find(code => code.language.name === settings.language);
        if (!defaultLangCode){
            return;
        }

        let key = `${problem.public_id}_${settings.language}`;
        let value = localStorage.getItem(key);

        if (value) {
            updateCodeValue(value);
            model.setValue(value);
        }
        else {
            updateCodeValue(defaultLangCode.value);
            model.setValue(defaultLangCode.value);
        }

        setLanguage(defaultLangCode.language.public_id);
        localStorage.setItem("preferred_lang", settings.language);
    }, [settings.language]);

    React.useEffect(() => {
        setCodeValue(codes[settings.language]);
        const defaultLangCode = codes.find(code => code.language.name === settings.language);
        setLanguage(defaultLangCode.language.public_id);
    }, []);

    return (
        <div className='flex flex-col px-4 py-3 gap-2'>
            <div className='flex flex-row justify-start items-center gap-3'>
                <div className='flex flex-row justify-center items-center'>
                    { getLanguageIcon() }
                    <select value={settings.language} onChange={(e) => updateSettings('language', e.target.value)} className='bg-neutral-800 px-2 py-1 text-sm focus-visible:outline-none'>
                        <option value="javascript" className='text-white'>JavaScript</option>
                        <option value="python">Python 3</option>
                        <option value="java">Java</option>
                    </select>
                </div>
                <button className='dark:text-gray-400' onClick={resetToDefaultCode}> 
                    <MdRefresh />
                </button>
            </div>
            <Editor value={getInitialCodeValue()} onChange={(val) => updateCodeValue(val)} height={"40rem"} className='flex-1' options={{
                quickSuggestions: false,
                wordBasedSuggestions: false
            }} theme='vs-dark' onMount={onEditorMount} defaultLanguage={settings.language} defaultValue={setDefaultValue()} />
        </div>
    )
}

export default EditorDiv