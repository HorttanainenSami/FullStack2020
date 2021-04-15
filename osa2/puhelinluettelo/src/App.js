import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import PersonService from './services/persons'
const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(()=>{
    PersonService
      .getAll()
      .then(initialPerson=>setPersons(initialPerson))
      }
  ,[])

  const handleFilter = (event) => setFilter(event.target.value) 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleDelete = id => {
    const deletePerson={
     ...persons.find(person=>person.id===id)
    }
    if( window.confirm(`Delete ${deletePerson.name}`)){
      PersonService
      .remove(id)
      .then(response=> setPersons(persons.filter(person=>person.id!==id)))
    }
  }
  const addPerson = (event) => {
    event.preventDefault()

    if(!persons.find(element =>element.name.toLowerCase()===newName.toLowerCase() )){
      const newPerson={
        name:newName,
        number:newNumber,
      }
      PersonService
      .create(newPerson)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    }else{
      alert(`${newName}, is already added to phonebook`)
    }
  }

  const personsToShow = filter.length ===0
  ?persons: persons.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
    <h2>Phonebook </h2>
      <Filter filter={filter} handleFilter={handleFilter} header='Phonebook' />
    <h3> Add a new</h3>
      <AddPerson onSubmit={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
    <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App
