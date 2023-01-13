import FolderTree from "../compoent/buttons/folderTree";
import QcodeEditor from "../compoent/editor/codeEditor";
import zipFile from "../jsLogic/zipFile";
import { useState, useEffect, useRef} from "react";
import { root } from "postcss";
import UserContext from "../compoent/UserContext";

var zip = new zipFile()

function QEditorWrapper(props){
    const content = useRef([])
    const [code, setCode] = useState('Edit code here.')
    const [data, setData] = useState({
        name: 'root',
        isFolder: false
    })
    const [isClicked, setIsClicked] = useState(false)
    const [rpath, getRpath] = useState('')
    useEffect(() => {
        document.addEventListener('keydown', getKeyPress, true)
        console.log(content.current)
        // console.log(isClicked)
        if (zip.zipContent && isClicked 
            && (content.current.find(obj => obj.relative_path === rpath).content === null)
            ){
            zip.getText(rpath)
            .then(data => {
                content.current.find(obj => obj.relative_path === rpath).content = data 
                setCode(content.current.find(obj => obj.relative_path === rpath).content)
            })
            .catch(err => console.log(err))
        }
        else if (isClicked){
            setCode(content.current.find(obj => obj.relative_path === rpath).content)
        }
        
       
    })
    function getKeyPress(event){
        if (event.ctrlKey && event.shiftKey && (event.code === 'KeyS')){
            zip.saveContent(rpath, content.current.find(obj => obj.relative_path === rpath).content)
            
        }
    }
    function getRelativePath(val){
        
        setIsClicked(true)
        // getRelativePath(val)
        let new_content = content.current.find(obj => obj.relative_path === val) 
        if(!new_content){
            content.current.push({
                relative_path: val,
                content: null
            })
            getRpath(val)
        }
        else{
            getRpath(new_content.relative_path)
            
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
                    content.current.forEach( eachContent => {
                        zip.saveContent(eachContent.relative_path, eachContent.content)
                    })
                    zip.saveZipFile()
                }}
            >
                Save File
            </button>
            <UserContext.Provider value={{code, content}}>
                <div className="flex flex-row items-start w-full m-5">
                    <div 
                        className='h-max mr-2 w-1/6 border-2 border-black'
                    > 
                    <FolderTree  
                        data={[data]} 
                        getRelativePath={getRelativePath}
                        isClicked={isClicked}
                    />
                    </div>
                    <div
                        className="ml-2 w-5/6 border-2 border-black"
                    >
                    <QcodeEditor 
                        code={code} 
                        rpath={rpath} 
                        setCode={setCode}
                        isClicked={isClicked}
                        setIsClicked={setIsClicked}    
                    />
                    </div>
                </div>
            </UserContext.Provider>
            
        </div>
    )
}

export default QEditorWrapper
