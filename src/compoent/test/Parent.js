import React from 'react'
import Child from './Child';

const Parent = () => {
const data = "<h1>Hello Everyone</h1>";
	return(
		<div>
		<Child data={data}/>
		</div>
	);
}

export default Parent;
