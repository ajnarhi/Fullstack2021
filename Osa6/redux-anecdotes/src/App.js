import React, {useEffect} from 'react'
//import React from 'react'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/AnecdoteForm'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'




const App = () => {
  const dispatch = useDispatch()
  // useEffect(() => {
  //   anecdoteService
  //     .getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
  // }, [dispatch])
  useEffect(() => {  
      dispatch(initializeAnecdotes())  
     },[dispatch]) //kun dspatchin tila muuttuu niin käy tekemässä ylläoleva eli anekdoottien listaus
 

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