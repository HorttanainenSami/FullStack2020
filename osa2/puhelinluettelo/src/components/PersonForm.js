import React from 'react'

const PersonForm=({handleChange,handleNumb,addName})=>{
return(
	<div>
	  <h2> Add a new </h2>
      <form>
        <div>
          name: <input onChange={handleChange} />
        </div>
	  <div>
	  number: <input onChange={handleNumb} />
	  </div>
        <div>
          <button onClick={addName}>add</button>
        </div>
      </form>
	</div>
)
}
export default PersonForm;
