import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        votes: 0,
        // id: generateId()
      }
    })
  }

  // Temp name
  const vote2 = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
  
  const vote = (id) => {
/*
    store.dispatch({
      type: 'GOOD'
    })*/
    // store.dispatch(vote2(id))
    dispatch(vote2(id))
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