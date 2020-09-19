import React from 'react'
import Person from './Person'

const Persons = ({persons, filter, removePerson}) => {
    if(filter === '') { 
        return persons.map(person => <Person key={person.name} person={person} remove={() => removePerson(person.id)} />)
    }

    const filterPersons = (name) => name.toLowerCase().includes(filter.toLowerCase())

    const filteredPersons = persons.filter(person => filterPersons(person.name))

    return filteredPersons.map(person => <Person key={person.name} person={person} remove={() => removePerson(person.id)} /> ) 
}

export default Persons