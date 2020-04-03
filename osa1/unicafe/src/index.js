import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Display = (props) =>  (
  <div>
    <div>{props.name} {props.value}</div>
  </div>
)

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
      <Display value={good} name="good"/>
      <Display value={neutral} name="neutral"/>
      <Display value={bad} name="bad"/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)