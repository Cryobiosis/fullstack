import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  // Is it good to use let?
  let [votes, setVotes] = useState(0)
  // Init array, if not initialized
  // https://stackoverflow.com/questions/1295584/most-efficient-way-to-create-a-zero-filled-javascript-array
  if (votes.length != anecdotes.length)
    votes = new Array(props.anecdotes.length).fill(0);
  // console.log("Votes: ", votes)

   const handleNextClick = () => {  
    // console.log(Math.floor(Math.random() * props.anecdotes.length))
    setSelected(Math.floor(Math.random() * props.anecdotes.length))  
  }
  
  const handleVoteClick = () => {  
    // console.log('Vote', selected)
    const copy = [...votes]
    // kasvatetaan taulukon paikan vote arvoa yhdellä
    copy[selected] += 1
    // console.log(copy)
    setVotes(copy)  
  }

  let best = '';
  // https://www.jstips.co/en/javascript/calculate-the-max-min-value-from-an-array/
  let maxVote = Math.max.apply(null, votes)
  // Search position on array
  let voteID = votes.indexOf(maxVote);

  // Ugly code.. no need to optimize
  if (maxVote > 0 && voteID != undefined)
    best = props.anecdotes[voteID]

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div>
        <Button text="next anecdote" handleClick={handleNextClick}/>
        <Button text="vote" vote={selected} handleClick={handleVoteClick}/>
      </div>
      <h2>Anecdote with most votes</h2>
        {best}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)