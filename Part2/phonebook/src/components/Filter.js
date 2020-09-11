import React from 'react'

const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
            Filter with Name: <input value={filter} onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter