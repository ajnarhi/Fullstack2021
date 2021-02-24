import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from './../services/anecdotes'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content) //tässä käytetään serviceä, jolla uusi anekdootti luokaan
    dispatch(createAnecdote(newAnecdote)) //mitä tässä käytetään? yllä create new, tässä createAnecdote. MIkä ero? Mikä järki?
   //dispatch(createAnecdote(content))
   
    
  }

  return (
    
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  )
}

export default NewAnecdote