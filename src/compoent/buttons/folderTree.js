import React, {useState} from 'react';
import CodeContext from '../CodeContext';
import { useContext } from 'react';

 const FolderTree = (props) => {
  const {files, fileName} = useContext(CodeContext)
  let data = props.data
  const [showNested, setShowNested] = useState({});
  let file = files[fileName]
  let disableButton = false;
  

  // handle show/hide functionality
  const toggleNested = (name) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };
  // console.log('file is', file)
  return (
    <div className='flex flex-col items-start overflow-hidden truncate ml-5'>
      {data.map((parent) => {
        if(file && props.isClicked){
          if(file.name == parent.name){
            disableButton = true
          }
        }
        return (
          <div key={parent.name}>
            {/* rendering folders */}
            {parent.isFolder && <button
              className="h-8 text-left" 
              onClick={() => toggleNested(parent.name)}
              >{parent.name}</button>}
            {/* rendering files */}
            {!parent.isFolder && <button 
              disabled={disableButton}
              className="h-8 text-left" 
              rpath={parent.relative_path} 
              onClick={() => {
                
                props.getFileContent(parent.relative_path, parent.name);

              }}> {parent.name}</button>}
            <div style={{ display: !showNested[parent.name] && "none" }}>
              {parent.children && <FolderTree 
                className={props.className} 
                data={parent.children} 
                getFileContent={props.getFileContent}
              />}
            </div>
          </div>
        );
      })}
    </div>
  );
 };
 
 export default FolderTree;