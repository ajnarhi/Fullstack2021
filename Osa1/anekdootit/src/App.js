import React, { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
  {props.text}
  </button>

)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  const [votes, setVotes] = useState ([0, 0, 0, 0, 0, 0]) 
   

  const [selected, setSelected] = useState(0)
  const randomSelected = () =>{
    setSelected (Math.floor(Math.random() * anecdotes.length))
  }
  console.log(selected)

  const voteGiven= () => {
    const copy = [...votes] //tekee taulukon, jossa on kaikki elementit votes taulukosta
     copy[selected] += 1
    setVotes(copy)
  }

  var highestVotes = 0
  var whichAnecdote = null
  var i;
  for (i = 0; i < votes.length; i++) {
    if (votes[i] > highestVotes){
      highestVotes = votes[i]
      whichAnecdote = i
    }
    console.log('Highestvotes', highestVotes, whichAnecdote)

  }


  return (
    <div>
      <h1>Anecdote of the day</h1>

      <p>{anecdotes[selected]}</p>
      <p>This anecdote has this many votes: {votes[selected]}</p>
      <Button  handleClick={voteGiven}
        text='Vote this anecdote'/>
      <Button  handleClick={randomSelected}
        text='Next anecdote!'/>
      
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[whichAnecdote]} </p>
      <p>This anecdote has {highestVotes}</p>



    </div>
  )
}

export default App
