import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const StatisticLine = (props) =>  (
  <tr>
    <td>{props.name}</td><td>{props.value}{props.suffix}</td>
  </tr>
)

const Statistic = ({good, bad, neutral}) =>  {

  let all = bad + good + neutral
  // Good 1, neutral 0, bad -1
  // TODO: Optimize
  let avg = ((1 * good) + (-1 * bad)) / all

  if (good > 0 || bad > 0 || neutral > 0)
    return (
      <div>
        <table>
          <tbody>
        <StatisticLine value={good} name="good"/>
        <StatisticLine value={neutral} name="neutral"/>
        <StatisticLine value={bad} name="bad"/>
        <StatisticLine value={all} name="all"/>
        <StatisticLine value={avg} name="average"/>
        <StatisticLine value={good / all * 100} name="positive" suffix=" %"/>
        </tbody>
      </table>
      </div>)
    else 
      return <div>No feedback given</div>
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }
  return (
    <div>
       <h2>give feedback</h2>
       
          
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>

      <h2>Statistic</h2>
      <Statistic bad={store.getState().bad} good={store.getState().good} neutral={store.getState().ok}/>

    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
