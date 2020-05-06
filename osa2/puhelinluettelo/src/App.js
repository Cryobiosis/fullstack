import React, { useState } from 'react'


const Number = (props) => {
  //console.log(name)
  return (
    <li>{props.person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

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
        date: new Date().toISOString(),
        id: persons.length + 1,
      }
      console.log(numObject)
      setPersons(persons.concat(numObject))
      setNewName('')
    }
  }
  const handleNumChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
   }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNum}>
        <div>
          name:
          <input type="text" name="name" value={newName} onChange={handleNumChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
          {persons.map((person, i) => 
            <Number key={person.name} person={person} />
          )}
        </ul>
    </div>
  )

}

export default App