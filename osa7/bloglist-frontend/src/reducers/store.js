import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
//import blogService from '../services/blogs'
//import { intializeAnecdotes } from '../reducers/anecdoteReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  users: userReducer,
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
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store