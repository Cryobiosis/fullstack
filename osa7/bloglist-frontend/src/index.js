import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  BrowserRouter as Router
} from 'react-router-dom'

// import { createStore } from 'redux'
import { Provider } from 'react-redux'
// TODO: thunk!
import store from './reducers/store'

//import notificationReducer from './reducers/notificationReducer'
//import { composeWithDevTools } from 'redux-devtools-extension'
/*
const reducers = combineReducers({
  notes: noteReducer,
  // filter: filterReducer
})*/

/*
const store = createStore(
  notificationReducer,
  composeWithDevTools()
)*/


store.subscribe(() => {
  const storeNow = store.getState()
  console.log('Provider store:', storeNow)
})

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>, document.getElementById('root'))