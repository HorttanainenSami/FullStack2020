import React, { useState } from 'react'
const Filter=({setFilter})=>{
	const handleChange=(event)=>{
		setFilter(event.target.value);
		console.log(event.target.value)
	}
	return(
	<div> 
	<p> filter shown with <input onChange={handleChange}/></p>
	</div>
	)

}
const Person=({persons,filter})=>{
const filtPersons=persons.filter(person=>person.name.toLowerCase().includes(filter));

	return(<div>
	  {filtPersons.map(person=><li key={person.name}>{person.name} {person.number}</li>)}
		</div>
	)
}
const App = () => {
	const [ persons, setPersons] = useState([
	    { name: 'Arto Hellas',number:'040-1231244' }
	  ]) 
	const [ newName, setNewName ] = useState('')
	const [newNumb,setNewNumb]=useState('')
	const [filter, setFilter]=useState('');
	const handleChange=(event)=>setNewName(event.target.value);
	const handleNumb=(event)=>setNewNumb(event.target.value);
	
	const addName=(event)=>{
		event.preventDefault();
		if(persons.filter(person=>person.name===newName).length===0){
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
	
	<Filter setFilter={setFilter}/>

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

      <h2>Numbers</h2>
	  <Person persons={persons} filter={filter} />
    </div>
  )

}

export default App
