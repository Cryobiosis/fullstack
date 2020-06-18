import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteActionCreator, newAnecdoteActionCreator } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)

  // Sort anecdotest by vote
  anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)

  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch(newAnecdoteActionCreator(content))
  }
  
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input type="text" name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App