import React from 'react'

const Country = ({country, setFilter}) => {

    const handleClick = () => setFilter(country.name)

    return(
        <div>
            {country.name}<button onClick={handleClick}>Show</button>
        </div>
    )
}
export default Country