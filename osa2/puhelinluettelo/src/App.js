import React, { useState } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState(
  [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ] )
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleFilter = (event) => setFilter(event.target.value) 
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    if(!persons.find(element =>element.name.toLowerCase()===newName.toLowerCase() )){
      const newPerson={
        name:newName,
        number:newNumber,
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
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
      <Persons persons={personsToShow} />
    </div>
  )

}

export default App
