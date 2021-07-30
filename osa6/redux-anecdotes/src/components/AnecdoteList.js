import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteActionCreator } from '../reducers/anecdoteReducer'
import { newNotificationActionCreator } from '../reducers/notificationReducer'

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
const filterItems = (arr, query) => {
  return arr.filter(el => el.content.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

const AnecdoteList = () => {

    const dispatch = useDispatch()
    let anecdotes = useSelector(state => state.anecdotes)

    // Filter anedotes
    const filter = useSelector(state => state.filter)
    if (filter) {
      anecdotes = filterItems(anecdotes, filter)
    }
   
    // Sort anecdotest by vote
    anecdotes.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
     
    const vote = (id) => {
      dispatch(voteActionCreator(id))
      const content = anecdotes.find(x => x.id === id).content;
      const message = 'you voted \'' + content + '\''
  
      dispatch(newNotificationActionCreator(message))

      setTimeout(() => {
        dispatch(newNotificationActionCreator(''))
      }, 5000)

      console.log('vote', id)
    }
  
    return (
      <div>
        {
        anecdotes.map(anecdote =>
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
      </div>
    )
}

export default AnecdoteList
