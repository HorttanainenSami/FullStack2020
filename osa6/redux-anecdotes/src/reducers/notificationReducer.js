var timeoutID
export const setNotification = (message, duration) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message,
      },
    })
      clearTimeout(timeoutID)
      timeoutID = setTimeout( () => {
        dispatch({
          type: 'RESET_NOTIFICATION',
          data: {
            message: null,
          }
      })
    }, duration * 1000 )
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
