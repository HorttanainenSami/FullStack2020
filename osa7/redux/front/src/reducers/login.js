import storage from '../utils/storage'
import LoginService from '../services/login'

const loginReducer = (state=null, action) => {
  switch(action.type) {
    case 'LOGIN':
      storage.saveUser(action.data)
      return action.data
    case 'LOGOUT':
      storage.logoutUser()
      return null
    case 'CHECK_LOGIN':
      return storage.loadUser()
    default:
      return state
  }
}
export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await LoginService.login(credentials) 
    dispatch({
      type: 'LOGIN',
      data: user
    })
   }
}
export const checkLogin = () => {
  return{
    type: 'CHECK_LOGIN',
  }
}
export const logoutUser = () => {
  return{
    type: 'LOGOUT',
  }
}

export default loginReducer
