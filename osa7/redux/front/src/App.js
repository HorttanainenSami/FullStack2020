import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, checkLogin} from './reducers/login'
import { getUsers } from './reducers/users'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
const App = () => {

  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])
  useEffect(() => {
    dispatch(getUsers()) 
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
  }
  const IndexPage = () => {
    return (
      <div>
        <NavBar />
        <NewBlogForm user={user} handleLogout={handleLogout} />
        <BlogsList user={user} />
      </div>
    )
  }
  const NavBar = () => {
  return(
    <div>
      <h2>blogs</h2>
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>

    )
  }
  const UsersPage = () => {
    const table = () => (
      <div>
        <h2> Users </h2>
        <table>
          <tr>
            <td></td>
            <td> <b>blogs created</b></td>
          </tr>
          {users.map(user => (
            <tr>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
            )) }
      </table>
      </div>
    )
    return(
      <>
        <NavBar />
        {table()}
      </>
    )
  }
  return(
    <div>
      <Notification /> 
      <Switch>
        <Route path='/users'>
        {user ? <UsersPage /> : <LoginForm />} 
        </Route>
        <Route path='/'>
        {user ? <IndexPage /> : <LoginForm /> }
        </Route>
      </Switch>
    </div>
  )
}
export default App
