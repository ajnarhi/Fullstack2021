
const initialState = ""
let timeoutRunning=null

export const createNotification = (anecdote, time) => {
  clearTimeout(timeoutRunning)
  return  async dispatch =>{
    dispatch({type: 'NOTIFY',
    data: anecdote})
    
    timeoutRunning=setTimeout(() => {
      dispatch({
        type: 'CLEARNOTI'
      
      })
    }, time*1000)
       
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return "you voted " + action.data.content
    case 'CLEARNOTI':
      return ''
      default:
      return state
  }


}


export default reducer