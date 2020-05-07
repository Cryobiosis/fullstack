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
   
    // Use filter to search person by name
    const filter = persons.filter(tmp => tmp.name === newName)
    // Get person object from array
    let person
    if (filter.length > 0) person = filter[0]

    // Check is name already in phonebook
    if (person) {
      // alert(`${newName} is already added to phonebook`)
      // TODO: Really this check should be on done on server
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const numObject = {
          name:   newName,
          number: newNumber,
          date:   new Date().toISOString(),
          id:     persons.id,
        }
        personService
          .update(person.id, numObject)
          .then(returnedPerson => {
            // Remove old one and add new 
            setPersons(persons
                        .filter(tmp => tmp.id !== person.id)
                        .concat(returnedPerson)
            )
        })
      } 
    } else {
      //console.log('button clicked', event.target)
      const numObject = {
        name:   newName,
        number: newNumber,
        date:   new Date().toISOString(),
        // id: persons.length + 1,
      }
      personService
        .create(numObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
      })
    }
    setNewName('')
    setNewNumber('')
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