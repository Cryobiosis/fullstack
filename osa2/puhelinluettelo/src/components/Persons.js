import React from 'react'

const Person = ({person, deleteCallback}) => {
    return (
        <li>
            {person.name} {person.number} 
            <button onClick={() => deleteCallback(person)}>delete</button>
        </li>
    )
}

const Persons = (props) => {
    return (
        <div>
            <ul>
            {props.persons.map((person, i) => 
                <Person key={person.name} person={person} deleteCallback={props.deleteCallback} />
            )}
            </ul>
        </div>
        )
}

export default Persons