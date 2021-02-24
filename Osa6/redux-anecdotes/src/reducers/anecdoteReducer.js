// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]
// const generateId = () =>
//   Number((Math.random() * 1000000).toFixed(0))
  export const createVote =(id) => {
    return {
      type: 'VOTE',
      data: id
    }
  }

  export const initializeAnecdotes = (anecdotes) => {
    return {
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    }}
  export const createAnecdote= (data) => { //muutettu content ->data
  return {
    
      type: 'NEW_ANECDOTE', //anecdoteFormissa käytetään, mutta ei tällä NEW_ANECDOTE tyylillä. 
      //Missä käytetään tätä ja missä createAnecdote (kuten formissa)ja miksi?
      data
      }
  }

//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = [], action) => {

  console.log('state now: ', state)

  console.log('action', action)

  switch (action.type) {
    case 'VOTE':

      return state.map(anecdote => { //mapataan uusi taulukko siten, että jos id on eri kuin klikatun se lisätään sellaisenaan. Jos sama: lisää uusi olio
        if (anecdote.id !== action.data) {
          return anecdote
        } else {
          return {
            content: anecdote.content,
            id: action.data,
            votes: (anecdote.votes || 0) + 1 //

          }
        }
      })
      case 'NEW_ANECDOTE':
        return state.concat([action.data]) //stateen konkatenoidaan (yhdistetään) toinen taulukko

        case 'INIT_ANECDOTES':
          return action.data
    default:
      return state
  }


  

}



export default reducer