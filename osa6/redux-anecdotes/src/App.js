import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteActionCreator } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
// import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)

  // Sort anecdotest by vote
  anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)

  const dispatch = useDispatch()
   
  const vote = (id) => {
    dispatch(voteActionCreator(id))
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
       <AnecdoteForm />
    </div>
  )
}

export default App