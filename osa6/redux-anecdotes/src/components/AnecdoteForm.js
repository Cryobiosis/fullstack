import React from 'react'
// import { useDispatch } from 'react-redux'
import { newAnecdoteActionCreator } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdotesService from '../services/anecdotes'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
        
      const message = 'New anecdote created \'' + content + '\''
      // dispatch(setNotification(message, 10))
      props.setNotification(message, 10)

      // const newAnecdote = await anecdotesService.createNew(content)
      // dispatch(newAnecdoteActionCreator(content))
      props.newAnecdoteActionCreator(content)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}
const mapDispatchToProps = {
  setNotification,
  newAnecdoteActionCreator,
}

const AnecdoteFormConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)

export default AnecdoteFormConnect

// export default AnecdoteForm
