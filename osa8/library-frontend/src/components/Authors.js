import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {
 
  const [ updateBirthYear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error)
      // props.setError(error.graphQLErrors[0].message)
    }    
  })
  
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const authors = props.authors
  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    
    updateBirthYear({ variables: { name, birthyear: Number(birthyear) }})

    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          birthyear
          <input
            type='number'
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
          <button type='submit'>update author</button>
        </div>
    </form>

    </div>
  )
}

export default Authors