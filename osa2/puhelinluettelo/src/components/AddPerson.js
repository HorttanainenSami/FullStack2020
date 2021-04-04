import React from 'react'
const AddPerson = ({onSubmit, handleNameChange, newName, handleNumberChange, newNumber}) =>(
  <div>
      <form onSubmit={onSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
)
export default AddPerson
