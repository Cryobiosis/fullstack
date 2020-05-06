import React from 'react'

const Person = (props) => {
    return (
      <li>{props.person.name} {props.person.number}</li>
    )
}

const Persons = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            <ul>
            {props.persons.map((person, i) => 
                <Person key={person.name} person={person} />
            )}
            </ul>
        </div>
        )
}

export default Persons