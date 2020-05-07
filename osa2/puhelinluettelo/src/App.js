import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/PersonService'

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

  // Get all persons
  useEffect(() => {
    // console.log('effect')
    personService
      .getAll()
      .then(personsInit => {
          setPersons(personsInit)
      })
  }, [])
  // [] Render also 1st time

  // Add number
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
        // id: persons.length + 1,
      }
      personService
        .create(numObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
      })
     
      // console.log(numObject)
      // setPersons(persons.concat(numObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = useFilter ? persons.filter(person => person.name.includes(useFilter)) : persons
  
  // Delete person from server and update GUI
  const deleteCallback = (person) => {
    console.log("delete", person.id)
    
    if (window.confirm(`Delete ${person.name} ?`)) { 
      personService
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(tmp => tmp.id !== person.id))
          //console.log(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          // setNotes(notes.filter(n => n.id !== id))     
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter name={useFilter} callback={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm 
        onSubmit      = {addNum} 
        name          = {newName}
        nameOnChange  = {handleNameChange} 
        number        = {newNumber} 
        numberOnChange= {handleNumChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons       = {personsToShow}
        deleteCallback= {deleteCallback}
        />

    </div>
  )

}

export default App