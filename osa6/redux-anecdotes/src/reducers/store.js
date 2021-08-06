import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { createStore, combineReducers } from 'redux'
import filterReducer from './filterReducer'
import anecdotesService from '../services/anecdotes'
import { intializeAnecdotes } from '../reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
    }
)

// Init anecdotes from remote server
anecdotesService.getAll().then(anec =>
    store.dispatch(intializeAnecdotes(anec))
  )
/*
anecdotesService.getAll().then(anec =>
      anec.forEach(note => {
        store.dispatch({ type: 'NEW_ANECDOTE', data: note })  
    })
)
*/

const store = createStore(
    reducer,
    composeWithDevTools())

export default store