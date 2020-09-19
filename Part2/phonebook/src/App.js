import React, { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import personService from './services/personService'
import Notification from './components/Notification'
import './index.css'

const App = () => {
	const [ persons, setPersons ] = useState([]) 
	const [ newName, setNewName ] = useState('')
	const [ newNumber, setNewNumber ] = useState('')
	const [ filter, setNewFilter ] = useState('')
	const [ message, setMessage ] = useState(null)


	const handleNameChange = (event) => setNewName(event.target.value)
	
	const handleNumberChange = (event) => setNewNumber(event.target.value)

	const handleFilterChange = (event) => setNewFilter(event.target.value)

	const addName = (event) => {
		event.preventDefault()
		if(persons.some(person => person.name === newName)) {

			if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {

				const person = persons.find(person => person.name === newName)
				const changedPerson = {...person, number: newNumber}
				
				personService
					.update(changedPerson)
					.then(updatedPerson => {
						setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
						setMessage({text :`Updated ${updatedPerson.name}'s phone number`, class: 'success'})
						setTimeout(() => {
							setMessage(null)
							} ,5000)
					})
					.catch(error => {
						setMessage({text: `${changedPerson.name} was already deleted from the server`, class: 'error'})
						setTimeout(() => {
							setMessage(null)
							} ,5000)
					})
			}

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

		const newPerson = {
			name: newName,
			number: newNumber
		}
			
		personService
			.create(newPerson)
			.then(newObject => {
				setPersons(persons.concat(newObject))
				setNewName('')
				setNewNumber('')
				setMessage({text: `Added ${newObject.name} to the phonebook`,class: 'success'})
				setTimeout(() => {
					setMessage(null)
				} ,5000)
		}) 
	}

	const removePerson = (id) => {
	const person = persons.find(person => person.id === id)
	if(window.confirm(`Delete ${person.name}?`)) {
		personService
			.deletePerson(id)
			.then(deletedPerson => {
				setPersons(persons.filter(person => person.id !== id ))
			})
	}
	}

	useEffect(() => {
		personService
			.getAll()
			.then(allPersons => 
				setPersons(allPersons)
	)
	},[])

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
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
			<Persons persons={persons} filter={filter} removePerson={removePerson} /> 
		</div>
	)        
}

export default App