import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './blogReducer'
import notificationReducer from './notificationReducer'
import loginReducer from './loginReducer'
import userReducer from './userReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


const reducer = combineReducers({
  blogs: blogReducer,
  login: loginReducer,
  users: userReducer,
  notifications: notificationReducer,
  //filter: filterReducer,
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store