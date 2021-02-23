import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
//import { Provider } from 'react-redux' 
import anecdotesReducer from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdotes: anecdotesReducer,
 
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store