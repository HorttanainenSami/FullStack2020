export const setNotification = (message) => {
  return{
    type: 'SET_NOTIFICATION',
    data: {
      message,
    },
  }
}
export const resetNotification = () => {
  return{
    type: 'RESET_NOTIFICATION',
    data: {
      message: null,
    },
  }
}
const reducer = (state = { message: null }, action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data
    case 'RESET_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default reducer
