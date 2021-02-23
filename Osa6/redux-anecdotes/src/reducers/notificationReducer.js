
const initialState = "TÄMÄ ON NOTIFIAATIO"

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return state

      default:
      return state
  }

}


export default reducer