import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

/*
client.query({ ALL_AUTHORS })
  .then((response) => {
    console.log(response.data)
})*/

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const allAuthors = useQuery(ALL_AUTHORS)
  /*if (allAuthors.loading)  {
    return <div>loading...</div>
  }*/

 const allBooks = useQuery(ALL_BOOKS)
  if (allBooks.loading || allAuthors.loading)  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)  
  }
  return (
    <div>
       <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      {/*<Authors
        authors = {allAuthors.data.allAuthors}
        show={page === 'authors'}
      />*/}

      <Books
        books = {allBooks.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        setError={notify}
        show={page === 'add'}
      />

    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }  return (
  <div style={{color: 'red'}}>
    {errorMessage}
    </div>
)}

export default App