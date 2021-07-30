import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteActionCreator } from '../reducers/anecdoteReducer'
import { newNotificationActionCreator } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

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
