
const initialState = "TÄMÄ ON NOTIFIKAATIO"

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFY':
      return state

      default:
      return state
  }

}


export default reducer