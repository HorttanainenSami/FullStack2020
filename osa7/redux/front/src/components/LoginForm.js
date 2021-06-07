import React from 'react'
import useField from '../hooks/index'
import Togglable from './Togglable'
import { TextField, Button } from '@material-ui/core'
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
      const user = {
        username: username.value,
        password: password.value,
      }
      resetUsername()
      resetPassword()
      await dispatch(loginUser(user))
    
    }catch(exception){
      dispatch(setNotification('Wrong credentials', 'error'))
    }
  }
  const loginFormRef = React.createRef()
  return (
    <>
      <Togglable buttonLabel='Login to application' ref={loginFormRef}>
        <form onSubmit={submit}>
          <div>
            <TextField label='usernamme' {...username} />
          </div>
          <div>
            <TextField label='password' {...password} />
          </div>
          <Button variant ='outlined' type='submit' id='login'>login</Button>
        </form>
      </Togglable>
    </>
  )
}
export default LoginForm
