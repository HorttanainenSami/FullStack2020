import React from 'react'
import useField from '../hooks/index'
import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notification'
import { loginUser } from '../reducers/login'

const LoginForm = () => {
  const [username, resetUsername] = useField('text')
  const [password, resetPassword] = useField('password')
  const dispatch = useDispatch()

  const submit = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      resetUsername()
      resetPassword()
      dispatch(loginUser(user))
      dispatch(setNotification(`${user.username} welcome back!`))
    }catch(exception){
      dispatch(setNotification('Wrong credentials', 'error'))
    }
  }
  return (
    <div>
      <h2>login to application</h2>

      <form onSubmit={submit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}
export default LoginForm
