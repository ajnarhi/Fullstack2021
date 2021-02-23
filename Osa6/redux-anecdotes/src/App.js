import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch() //mitä tällä tehdään?

  const vote = (id) => {
    console.log('vote', id)
    dispatch({
      type: 'VOTE',
      data: id
    })
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content,
        id: generateId(),
        votes: 0
      }
    })
  }

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
      <form onSubmit={createAnecdote}>
        <input name="anecdote" />
        <button type="submit">Create</button>
      </form>
      
    </div>
  )
}

export default App