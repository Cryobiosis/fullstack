import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

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
    
    updateBirthYear({ variables: { name: name.value, birthyear: Number(birthyear) }})

    setName('')
    setBirthyear('')
  }
  
  // https://www.codegrepper.com/code-examples/javascript/javascript+map+array+of+objects
  const options = authors.map(a => ({'value': a.name, 'label': a.name}) )
  // console.log(options)

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
          <Select
            name={name}
            value={name}
            onChange={setName}
            // onChange={({ target }) => setName(selectedOption)}
            options={options}
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