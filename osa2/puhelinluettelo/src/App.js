import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import Filter from './components/Filter'
import PersonService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(()=>{
    PersonService
      .getAll()
      .then(initialPerson=>setPersons(initialPerson))
      }
  ,[])

  const handleNotification = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
  }
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
      .then(response=>{
        setPersons(persons.filter(person=>person.id!==id))
        handleNotification(`${deletePerson.name} deleted from server`)
      })
      .catch(error => {
        handleNotification(`${deletePerson.name} has already removed from server`)
        setPersons(persons.filter(person=>person.id!==deletePerson.id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.find(element =>element.name.toLowerCase()===newName.toLowerCase() )
    if(!exists){
      const newPerson={
        name:newName,
        number:newNumber,
      }

      PersonService
      .create(newPerson)
      .then(returnedPerson=>{
        handleNotification(`Add ${returnedPerson.name} to phonebook`)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    }else{
      if(window.confirm(`${newName}, is already added to phonebook, replace the old number with a new one?`)){
        const updatePerson={
          ...persons.find(person=>person.name===newName),
          number:newNumber,
        }
        PersonService
        .update(updatePerson, updatePerson.id)
        .then(returnedPerson=>{
          handleNotification(`Change ${returnedPerson.name} number`)
          setPersons(persons.map(person=>person.id===updatePerson.id?updatePerson:person))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          handleNotification(`${updatePerson.name} has already removed from server`)
          setPersons(persons.filter(person=>person.id!==updatePerson.id))
      })
      }
    }
  }

  const personsToShow = filter.length ===0
  ?persons: persons.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()))
  
  return (
    <div>
    <h2>Phonebook </h2>
    <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} header='Phonebook' />
    <h3> Add a new</h3>
      <AddPerson onSubmit={addPerson} handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} />
    <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )

}

export default App
