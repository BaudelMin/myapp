import zipFile from "../../jsLogic/zipFile";
// import CodeEditor from 'react-textarea-code-editor-2';
import Editor, {DiffEditor, useMonaco, loader} from "@monaco-editor/react";
import {useState, useEffect, useContext} from 'react'
import UserContext from "../UserContext";

var zip = new zipFile()
function QcodeEditor(props){
    const {code, content} = useContext(UserContext)
    const [curcode, setcurCode] = useState(code)
    
    return (
        <div>
            <Editor 
                value={props.isClicked ? code : curcode}
                height="90vh"
                defaultLanguage="python"
                defaultValue="Edit code here"
                onChange={(evn) => {
                    setcurCode(evn.target.value);
                    props.setIsClicked(false)
                    let index = content.current.findIndex(obj => obj.relative_path === props.rpath)
                    // console.log(content.current)
                    content.current[index].content = evn.target.value
                    props.setCode(evn.target.value)
                }}
                // onClick={(e)=>setCode(props.codeData)}
                autoFocus
                padding={15}
                style={{
                  fontSize: 12,
                  backgroundColor: "#f5f5f5",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
            />
        </div>
    )
}


export default QcodeEditor
