import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
   
    
  }

  return (
    
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Create</button>
    </form>
  )
}

export default NewAnecdote