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

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>This anekdote has this many votes: {votes[selected]}</p>
      <Button  handleClick={voteGiven}
        text='Vote this anekdote'/>
      <Button  handleClick={randomSelected}
        text='Next anecdote!'/>
      
    </div>
  )
}

export default App
