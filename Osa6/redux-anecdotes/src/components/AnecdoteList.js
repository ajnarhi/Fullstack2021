import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createVote } from './../reducers/anecdoteReducer'
import {createNotification} from './../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)//initialize on täyttänyt state.anecdotesiin anekdootits. Kun anekdoottilista muuttuu tietää tämä useSelector, että tila on muuttunut ja piirtää sivun uusiksi
  const dispatch = useDispatch() 

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(createVote(anecdote))
    dispatch(createNotification(anecdote,10))
  }

  anecdotes.sort((a, b) => {
    if (a.votes > b.votes) {
      return -1
    } if (a.votes < b.votes) {
      return 1
    }
    return 0

  })
  return(
    <ul>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes {}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </ul>
  )
}

export default AnecdoteList