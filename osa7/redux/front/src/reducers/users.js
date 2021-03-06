import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_ALL',
      data: users
    })
  }
}
const userReducer = (state=[], action) => {
  switch(action.type) {
    case 'GET_ALL':
      return action.data
    default:
      return state
  }
}
export default userReducer
