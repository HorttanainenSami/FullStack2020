let timeoutID
export const setNotification = (message, type='success') => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type }
    })
    clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, 5*1000)
  }
}

const notificationReducer = (state=null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}
export default notificationReducer
