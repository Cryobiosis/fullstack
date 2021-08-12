import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdoteActionCreator } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
        
      const message = 'New anecdote created \'' + content + '\''
      dispatch(setNotification(message, 10))

      // const newAnecdote = await anecdotesService.createNew(content)
      dispatch(newAnecdoteActionCreator(content))
    }
    
    return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input type="text" name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  </div>)
}

export default AnecdoteForm
