import React from 'react'

const Filter =({filter, handleFilter}) =>(
    <div>
      <div> filter shown with <input onChange={handleFilter} value={filter} /></div>
    </div>
)
export default Filter
