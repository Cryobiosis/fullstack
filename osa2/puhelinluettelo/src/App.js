import React, { useState, useEffect } from 'react'
import Persons        from './components/Persons'
import PersonForm     from './components/PersonForm'
import Filter         from './components/Filter'
import Notification   from './components/Notification'
import personService  from './services/PersonService'

import './index.css'

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
  const [persons, setPersons]           = useState([])
  const [newName, setNewName]           = useState('')
  const [newNumber, setNewNumber]       = useState('')
  const [infoMessage, setInfoMessage]   = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  // Get all persons, get only in first render thus [] as second arg.
  useEffect(() => {
    personService
      .getAll()
      .then(personsInit => {
          setPersons(personsInit)
      })
  }, [])

  // Add number
  const addNum = (event) => {
    event.preventDefault()
   
    // Use filter to search person by name
    const filter = persons.filter(tmp => tmp.name === newName)
    // Get person object from array
    let person
    if (filter.length > 0) person = filter[0]

    // If name is already in phonebook then update
    if (person) {
      // NOTE: Really this check should be on done on server
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const numObject = {...person, number: newNumber}
        personService
          .update(person.id, numObject)
          .then(returnedPerson => {
            // Remove old one and add new in local array
            setPersons(persons
                        .filter(tmp => tmp.id !== person.id)
                        .concat(returnedPerson))

            setInfoMessage(`Updated ${newName}`)
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
        }).catch(error => {
          setErrorMessage(`the person '${person.name}' not found from server`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000) 
        })
      } 
    } else {
      const numObject = {
        name:   newName,
        number: newNumber,
        date:   new Date().toISOString(),
        // id: persons.length + 1,
      }
      // Create new object with POST
      personService
        .create(numObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(`Added ${newName}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000) 
      }).catch(error => {
        setErrorMessage(`the person '${numObject.name}' can't be created`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000) 
      })
      
     

    }
    // Reset always user input fields
    setNewName('')
    setNewNumber('')
  }

  // Delete person from server and update GUI
  const deleteCallback = (person) => {
    
    if (window.confirm(`Delete ${person.name} ?`)) { 
      personService
        .deletePerson(person.id)
        .then(returnedPerson => {
          setPersons(persons.filter(tmp => tmp.id !== person.id))
          //console.log(persons.filter(person => person.id !== id))
          setInfoMessage(`Removed ${person.name}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
  
        })
        .catch(error => {
          setErrorMessage(`the person '${person.name}' was already deleted from server`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000) 
        })
    }
  }

  // Use filter to limit persons
  const personsToShow = useFilter ? persons.filter(person => person.name.includes(useFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={infoMessage}  type='info'/>
      <Notification message={errorMessage} type='error'/>

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