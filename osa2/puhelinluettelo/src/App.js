import React, { useState } from 'react'
import Person from './components/Person'
import  PersonForm from './components/PersonForm'
import Filter from './components/Filter.js'
const App = () => {
	const [ persons, setPersons] = useState([
	    { name: 'Arto Hellas',number:'040-1231244' }
	  ]) 
	const [ newName, setNewName ] = useState('')
	const [newNumb,setNewNumb]=useState('')
	const [filter, setFilter]=useState('');
	const handleChange=(event)=>setNewName(event.target.value);
	const handleNumb=(event)=>setNewNumb(event.target.value);
	
	const handleFiltChange=(event)=>{
		setFilter(event.target.value);
		console.log(event.target.value)
	}
	const addName=(event)=>{
		event.preventDefault();
		if(persons.filter(person=>person.name.toLowerCase()===newName.toLowerCase()).length===0){
		const personObject={
			name:newName,
			number:newNumb
		}
		setPersons(persons.concat(personObject));
		}
		else{
		window.alert(`${newName} was already added to phonebook`);	
		}
	}
  return (
    <div>
      <h2>Phonebook</h2>
	
	<Filter handleFiltChange={handleFiltChange}/>
	<PersonForm handleChange={handleChange} handleNumb={handleNumb} addName={addName} />
      <h2>Numbers</h2>
	  <Person persons={persons} filter={filter} />
    </div>
  )

}

export default App
