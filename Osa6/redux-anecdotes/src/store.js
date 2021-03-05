import { createStore, combineReducers , applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//import { Provider } from 'react-redux' 
import anecdotesReducer, { initializeAnecdotes }  from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'




const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer
 
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

// anecdoteService.getAll().then(anecdotes =>
//   store.dispatch(initializeAnecdotes(anecdotes))
//   // anecdotes.forEach(anecdote => {
//   //   store.dispatch({ type: 'NEW_ANECDOTE', data: anecdote })
//   // })
// )


export default store