import React, { useState } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')


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