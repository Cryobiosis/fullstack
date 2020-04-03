import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) =>  (
  <tr>
    <td>{props.name}</td><td>{props.value}{props.suffix}</td>
  </tr>
)

const Statistic = ({good, bad, neutral}) =>  {

  let all = bad + good + neutral
  // Good 1, neutral 0, bad -1
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
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGoodClick = () => {  
    setGood(good + 1)  
  }
  const handleNeutralClick = () => {  
    setNeutral(neutral + 1)  
  }
  const handleBadClick = () => {  
    setBad(bad + 1)  
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick}/>
      <Button text="bad" handleClick={handleBadClick}/>
      <h2>Statistic</h2>
      <Statistic bad={bad} good={good} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)