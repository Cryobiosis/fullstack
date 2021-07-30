import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import { createStore, combineReducers } from 'redux'
import filterReducer from './filterReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    notifications: notificationReducer,
    filter: filterReducer,
    }
)

const store = createStore(
    reducer,
    composeWithDevTools())

export default store