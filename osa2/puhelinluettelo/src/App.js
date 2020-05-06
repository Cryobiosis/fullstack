import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  const [persons, setPersons]       = useState([])
  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  // [] Render also 1st time

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