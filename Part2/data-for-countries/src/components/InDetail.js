import React from 'react'


const InDetail = ({country}) => {
    return(
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Poupulation: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(language => <li key={language.name}>{language.name}</li> )}
            </ul>
            <img width='300' src={country.flag} alt={country.name} />
        </div>
    )
}

export default InDetail