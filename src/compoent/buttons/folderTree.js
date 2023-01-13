import React, {useState} from 'react';


 const FolderTree = (props) => {
  let data = props.data
  const [showNested, setShowNested] = useState({});

  // handle show/hide functionality
  const toggleNested = (name) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };
  return (
    <div className='flex flex-col items-start overflow-hidden truncate ml-5'>
      {data.map((parent) => {
        return (
          <div key={parent.name}>
            {/* rendering folders */}
            {parent.isFolder && <button 
              className="h-8 bg-red-50 text-left" 
              onClick={() => toggleNested(parent.name)}
              >{parent.name}</button>}
            {/* rendering files */}
            {!parent.isFolder && <button 
              className="h-8 bg-red-50 text-left" 
              rpath={parent.relative_path} 
              onClick={() => props.getRelativePath(parent.relative_path)}> {parent.name}</button>}
            <div style={{ display: !showNested[parent.name] && "none" }}>
              {parent.children && <FolderTree 
                className={props.className} 
                data={parent.children} 
                getRelativePath={props.getRelativePath}
              />}
            </div>
          </div>
        );
      })}
    </div>
  );
 };
 
 export default FolderTree;