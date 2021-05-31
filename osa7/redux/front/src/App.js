import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, checkLogin } from './reducers/login'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
const App = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin(user))
  }, [])

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  if ( !user ) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <div>
      <NewBlogForm user={user} handleLogout={handleLogout} />
      <BlogsList user={user} />
    </div>
  )
}
export default App
