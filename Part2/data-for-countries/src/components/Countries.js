import React from 'react'
import Country from './Country'

const Countries = ({ countries, setFilter }) => {
    return(
        <div>
            {countries.length <=10 ? 
                countries.map(country => <Country key={country.numericCode} country={country} setFilter={setFilter} />)
            : 'Too many matches, specify another filter'
            }
        </div>
    )
}

export default Countries