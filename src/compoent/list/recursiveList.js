import React, {useState} from 'react';
import MakeList from './htmlList';


 const Basic = ({data}) => {
  const [showNested, setShowNested] = useState({});

  // handle show/hide functionality
  const toggleNested = (name) => {
    setShowNested({ ...showNested, [name]: !showNested[name] });
  };
  return (
    <div style={{ paddingLeft: "20px" }}>
      {data.map((parent) => {
        return (
          <div key={parent.name}>
            {/* rendering folders */}
            {parent.isFolder && <button onClick={() => toggleNested(parent.name)}>{parent.name}</button>}
            {/* rendering files */}
            {!parent.isFolder && <span>{parent.name}</span>}
            <div style={{ display: !showNested[parent.name] && "none" }}>
              {parent.children && <Basic data={parent.children} />}
            </div>
          </div>
        );
      })}
    </div>
  );
 };
 
 export default Basic;