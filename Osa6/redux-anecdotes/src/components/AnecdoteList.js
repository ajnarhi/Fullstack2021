import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createVote } from './../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch() 

  const vote = (id) => {
    console.log('vote', id)
    dispatch(createVote(id))
  }
  return(
    <ul>
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
    </ul>
  )
}

export default AnecdoteList