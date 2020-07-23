import React from 'react';

const Filter=({ handleFiltChange})=>{
	return(
	<div> 
	<p> filter shown with <input onChange={handleFiltChange}/></p>
	</div>
	)

}
export default Filter;
