import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import { Provider } from 'react-redux' 
import anecdotesReducer, { initializeAnecdotes }  from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from './services/anecdotes'



const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer
 
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

// anecdoteService.getAll().then(anecdotes =>
//   store.dispatch(initializeAnecdotes(anecdotes))
//   // anecdotes.forEach(anecdote => {
//   //   store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
//   // })
// )


export default store