import FolderTree from "../compoent/buttons/folderTree";
import QcodeEditor from "../compoent/editor/codeEditor";
import zipFile from "../jsLogic/zipFile";
import { useState, useEffect, useRef} from "react";
import { root } from "postcss";
import UserContext from "../compoent/UserContext";
import * as monaco from "@monaco-editor/react";

var zip = new zipFile()



const getLanguage = function(filename){
    let extention = filename.slice(filename.lastIndexOf('.'))
    let language = ''
    switch (extention){
        case '.py':
            language = 'python';
            break;
        case '.md':
            language = 'Markdown'
            break;
        case '.json':
            language = 'JSON'
        default:
            language = 'python';
            break;
    }
    return language
}

function QEditorWrapper(props){
    let files = useRef({})
    const [fileName, setFileName] = useState('')
    const [isFileAdded, setIsFileAdded] = useState(false)
    const [data, setData] = useState({
        name: 'root',
        isFolder: false
    })
    const [isClicked, setIsClicked] = useState(false)
    useEffect(() => {
        document.addEventListener('keydown', getKeyPress, true)
        // console.log('files = ', files)
        
        // console.log('name', fileName) 
       
    })
    function getKeyPress(event){
        if (event.ctrlKey && event.shiftKey && (event.code === 'KeyS')){
            let file = files.current[fileName]
            zip.saveContent(file.relative_path, file.content)
            
        }
    }
    function getFileContent(val, name){
        setIsFileAdded(false)
        setIsClicked(true)
        setFileName(name)
        
        if(!(name in files.current)){
            zip.getText(val)
            .then(data => {
                files.current[name] = {
                    name: name,
                    relative_path: val,
                    content: data,
                    language: getLanguage(name)
                }
            })
            .catch(err => console.log(err))
            .finally(() => {
                setIsFileAdded(true)
            })
        }
    }
    return (
        <div>
            <input 
                id="file" 
                type='file' 
                accept=".zip" 
                placeholder="Get a zip file"
                onChange={e => {
                    zip.setFile(e.target.files[0])
                    zip.getZipTree()
                    .then(data => setData(data))
                    .catch(err => console.log(err))
                    
                }}
                />
            <button
                className="border-2 bg-red-200"
                onClick={() => {
                    files.current.forEach( eachContent => {
                        zip.saveContent(eachContent.relative_path, eachContent.content)
                    })
                    zip.saveZipFile()
                }}
            >
                Save File
            </button>
            <UserContext.Provider value={{files, fileName}}>
                <div className="flex flex-row items-start w-full m-5">
                    <div 
                        className='h-max w-1/6 border-2 border-black'
                    > 
                    {
                        (zip.file)?
                        <FolderTree  
                            data={[data]} 
                            getFileContent={getFileContent}
                            setIsFileAdded={(value) => setIsFileAdded(value)}
                            isClicked={isClicked}
                        />:
                        <div className="h-50">Folder tree</div>
                    }
                    </div>
                    <div
                        className="w-5/6 border-2 border-black"
                    >
                    {(isFileAdded || (fileName in files.current))?
                        <QcodeEditor 
                            isClicked={isClicked}
                            setIsClicked={setIsClicked}    
                        />:
                        <span>No file</span>
                }
                    </div>
                </div>
            </UserContext.Provider>
        </div>
    )
}

export default QEditorWrapper
