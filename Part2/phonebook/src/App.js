import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  console.log('Hello ')

  const handleNameChange = (event) => setNewName(event.target.value)
  
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const addName = (event) => {
      event.preventDefault()
      if(persons.some(person => person.name === newName)) {
          window.alert(`${newName} is already added to phonebook `)
          setNewName('')
          setNewNumber('')
          return;
      }
      if(persons.some(person => person.number === newNumber)) {
        window.alert(`${newNumber} is already added to phonebook `)
        setNewName('')
        setNewNumber('')
        return;
      }

      const nameObject = {
          name: newName,
          number: newNumber
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
  }

  useEffect(() => {
    console.log('effect begins')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('response received')
        const newPersons = response.data
        setPersons(newPersons)
      })
  },[])

  console.log('render', persons.length, 'persons')

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <h2>Add a new</h2>
        <PersonForm 
            addName={addName} 
            newName={newName} 
            newNumber={newNumber} 
            handleNameChange={handleNameChange} 
            handleNumberChange={handleNumberChange} 
        />
        <h2>Numbers</h2>
        <Persons persons={persons} filter={filter} /> 
    </div>
  )
}

export default App