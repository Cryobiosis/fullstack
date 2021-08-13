  
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  // Init items
  useEffect(() => {
    if (!baseUrl) return false;
    getAll().then(items =>
      setResources( items )
    )
  }, []) 

  // Can't init items here, web get infiniteloop, or axios will return promise, use useEffect
  const [resources, setResources] = useState([])
  // console.log(resources)

  const create = (resource) => {
    const token = ''
    const config = {
      headers: { Authorization: token },
    }
  
    const response = axios.post(baseUrl, resource, config)
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service, getAll
  ]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')
  
  // console.log('notes',notes)
  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    // TODO: This should refresh notes from remote server, so we can see new one...
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App