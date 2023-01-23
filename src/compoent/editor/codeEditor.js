import zipFile from "../../jsLogic/zipFile";
// import CodeEditor from 'react-textarea-code-editor-2';
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";
import {useState, useEffect, useContext} from 'react'
import UserContext from "../UserContext";

var zip = new zipFile()
let cvalue = 'Edit your code here'
function QcodeEditor(props){
    const {files, fileName} = useContext(UserContext)
    // console.log('files = ', files)
    let file = files.current[fileName]
    console.log('files = ', files)
    const onChange = function(newvalue, event){
        // console.log('event is ', event)
        files.current[fileName].content = newvalue
    }
    return (
        <div>
            <Editor 
                height="90vh"
                width="90vh"
                path={file.name}
                // value={file.value}
                // language={file.language}
                defaultLanguage={file.language}
                defaultValue={file.content}
                onChange={onChange}
                // onMount={handleEditorDidMount}
                // beforeMount={handleEditorWillMount}
                autoFocus
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
                saveViewState={true}
            />
        </div>
    )
}


export default QcodeEditor
