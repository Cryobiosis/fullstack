import React, { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  const [ useFilter, setFilter ]    = useState('')
  const handleFilterChange = (event) => {
      setFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const [persons, setPersons]       = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addNum = (event) => {
    event.preventDefault()
   
    // Map persons to array
    const personTmp = persons.map(person => person.name);
    // NOTE: Why not use directly reduce and check this?
    if (personTmp.indexOf(newName) > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      //console.log('button clicked', event.target)
      const numObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: persons.length + 1,
      }
      // console.log(numObject)
      setPersons(persons.concat(numObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = useFilter ? persons.filter(person => person.name.includes(useFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={useFilter} callback={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit={addNum} 
        name={newName}
        nameOnChange={handleNameChange} 
        number={newNumber} 
        numberOnChange={handleNumChange}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow}/>

    </div>
  )

}

export default App