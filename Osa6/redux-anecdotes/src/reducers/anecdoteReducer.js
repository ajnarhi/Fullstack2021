import anecdoteService from './../services/anecdotes'


export const createVote =(anecdote) => {
  return async dispatch => {
  const votedAnecdote=await anecdoteService.updateVotes(anecdote)
  dispatch({  
    type: 'VOTE',
    data: votedAnecdote
  })
}
  }
  // export const createVote =(id) => {
  //   return {
  //     type: 'VOTE',
  //     data: id
  //   }
  // }

  export const initializeAnecdotes = () => {
    return async dispatch =>{
      const anecdotes=await anecdoteService.getAll()
      dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
  export const createAnecdote= content => { //muutettu content ->data
  return async dispatch =>{
    const newAnecdote=await anecdoteService.createNew(content)
    dispatch({//palvelimelle lähetetty pyyntö uuden anekdootin lisäämisestä talletetaan dispatchilla selaimen tilaan (Store) dispatchin avulla
    
      type: 'NEW_ANECDOTE', 
      data:newAnecdote,
      })
  }}
  // export const initializeAnecdotes = (anecdotes) => {
  //   return {
  //     type: 'INIT_ANECDOTES',
  //     data: anecdotes,
  //   }}
  // export const createAnecdote= (data) => { //muutettu content ->data
  // return {
    
  //     type: 'NEW_ANECDOTE', 
  //     data
  //     }
  // }

const reducer = (state = [], action) => {

  console.log('state now: ', state)

  console.log('action', action)

  switch (action.type) {
    case 'VOTE':

      return state.map(anecdote => { //mapataan uusi taulukko siten, että jos id on eri kuin klikatun se lisätään sellaisenaan. Jos sama: lisää uusi olio
        if (anecdote.id !== action.data.id) {
          return anecdote
        } else {
          return action.data

          
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