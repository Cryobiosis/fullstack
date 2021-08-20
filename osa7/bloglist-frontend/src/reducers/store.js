import { composeWithDevTools } from 'redux-devtools-extension'
//import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { createStore, combineReducers,applyMiddleware } from 'redux'
//import filterReducer from './filterReducer'
import thunk from 'redux-thunk'
//import anecdotesService from '../services/anecdotes'
//import { intializeAnecdotes } from '../reducers/anecdoteReducer'

const reducer = combineReducers({
  //anecdotes: anecdoteReducer,
  notifications: notificationReducer,
  //filter: filterReducer,
})

// Init anecdotes from remote server
/*
anecdotesService.getAll().then(anec =>
    store.dispatch(intializeAnecdotes(anec))
  )
anecdotesService.getAll().then(anec =>
      anec.forEach(note => {
        store.dispatch({ type: 'NEW_ANECDOTE', data: note })  
    })
)
*/
asdasd
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store