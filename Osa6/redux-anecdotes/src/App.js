import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, createVote } from './reducers/anecdoteReducer'



const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch() 

  const vote = (id) => {
    console.log('vote', id)
    dispatch(createVote(id))
  }



  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
   dispatch(createAnecdote(content))
    
  }
  // blogs.sort((a, b) => {
  //   if (a.likes > b.likes) {
  //     return -1
  //   } if (a.likes < b.likes) {
  //     return 1
  //   }
  //   return 0

  // })
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes {}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
      
    </div>
  )
}

export default App