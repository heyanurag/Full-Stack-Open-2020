import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter' 
import Countries from './components/Countries'
import InDetail from './components/InDetail'

const App = () => {
    const [ countries, setCountries ] = useState([]);
    const [ filter, setFilter ] = useState('');
    
    const handleFilterChange = (event) => setFilter(event.target.value)

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const checkFilter = (name) => name.toLowerCase().includes(filter.toLowerCase())

    const filteredCountries = countries.filter(country => checkFilter(country.name))

    return(
        <div>
            <h1>Countries DataBase</h1>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            {filteredCountries.length > 1 && filter.length > 0 ?
                <Countries countries={filteredCountries} setFilter={setFilter} /> : ''
            }
            {filteredCountries.length === 1 ?
                <InDetail country={filteredCountries[0]} />
                : ''
            }
        </div>
    )
}

export default App