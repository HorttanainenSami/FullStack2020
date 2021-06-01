import React, { useEffect } from 'react'
import { Switch, Route, Redirect, Link, useParams } from 'react-router-dom'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, checkLogin} from './reducers/login'
import { getUsers } from './reducers/users'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import User from './components/pages/User'
import UsersPage from './components/pages/UsersPage'
const App = () => {

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [])
  useEffect(() => {
    dispatch(getUsers()) 
  }, [dispatch])

  const IndexPage = () => {
    return (
      <div>
        {user && <NewBlogForm />}
        <BlogsList user={user} />
      </div>
    )
  }
  const NavBar = () => {
    if(user) {
      return(
        <div>
          <h2>blogs</h2>
          <div>
            <p>{user.username} logged in</p>
            <button 
              onClick={() => dispatch(logoutUser())}>
              logout
            </button>
          </div>
        </div>
      )
    }
    return(
      <>
        <h2>blogs</h2>
        <LoginForm /> 
      </>
      )
  }
  
  return(
    <div>
      <Notification /> 
      <Switch>
        <Route path='/users/:id'>
          <><NavBar /> <User users={users} /></>
        </Route>
        <Route path='/users'>
          <><NavBar /><UsersPage users={users}/></>
        </Route>
        <Route path='/'>
          <> <NavBar /><IndexPage /></>
        </Route>
      </Switch>
    </div>
  )
}
export default App
