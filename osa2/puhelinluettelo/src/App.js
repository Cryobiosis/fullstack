import React, { useState } from 'react'

const Number = (props) => {
  //console.log(name)
  return (
    <li>{props.person.name} {props.person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ useFilter, setFilter ]    = useState('')

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
    }
  }
  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setFilter(event.target.value)
  }
  
  const personsToShow = useFilter ? persons.filter(person => person.name.includes(useFilter)) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with
        <input type="text" name="filter" value={useFilter} onChange={handleFilterChange}/>
       </div>
      <form onSubmit={addNum}>
        <div>
          name:
          <input type="text" name="name" value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number:
          <input type="text" name="number" value={newNumber} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {personsToShow.map((person, i) => 
            <Number key={person.name} person={person} />
          )}
        </ul>
    </div>
  )

}

export default App