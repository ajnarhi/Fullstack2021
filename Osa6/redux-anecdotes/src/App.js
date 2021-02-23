import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'



const App = () => {
 

  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <h2>Create new</h2>
      <NewAnecdote/>
    </div>
  )
}

export default App