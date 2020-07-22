import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
	const handleChange=(event)=>{
		setNewName(event.target.value);
	}
	const addName=(event)=>{
		event.preventDefault();
		const personObject={
		name:newName

		}
		setPersons(persons.concat(personObject));
	}
  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          name: <input onChange={handleChange} />
        </div>
        <div>
          <button onClick={addName}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>
	  {persons.map(person=><li key={person.name}>{person.name}</li>)}
    </div>
  )

}

export default App
