import {DiffEditor, useMonaco, loader} from "@monaco-editor/react";
import UserContext from "../UserContext";
import { useContext } from "react";

function CodeDiffEditor(){
    const {files, fileName} = useContext(UserContext)
    let file = files.current[fileName]
    console.log('files in Diff Editor', files)
    console.log('fileName = ', fileName)
    console.log('file = ', file)
    return (
        <div>
            <DiffEditor
                height="90vh"
                width="90vh"
                original={file.original_content}
                modified={file.content}
            >

            </DiffEditor>
        </div>
    )
}

export default CodeDiffEditor
