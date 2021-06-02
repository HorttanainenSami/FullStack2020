import React, { useEffect } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, checkLogin} from './reducers/login'
import { getUsers } from './reducers/users'
import BlogsList from './components/BlogsList'
import LoginForm from './components/LoginForm'
import User from './components/pages/User'
import UsersPage from './components/pages/UsersPage'
import { initializeBlogs } from './reducers/blogs'
import Blog from './components/pages/Blog'
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
  useEffect(() => {
    console.log('initializing')
    dispatch(initializeBlogs())
  }, [])

  const IndexPage = () => {
    return (
      <div>
        {user && <NewBlogForm />}
        <BlogsList user={user} />
      </div>
    )
  }
  const NavBar = () => {
    const style = {
      backgroundColor: 'lightgrey',
      padding: 10,
    }
    const logoutForm = () => (
      <>
      <span><b> {user.username} logged in</b></span>
        <button 
          onClick={() => dispatch(logoutUser())}>
          logout
        </button>
      </>
    )


    return(
      <div style={style}>
          <Link to='/blogs'>
            <span> Blogs </span>
          </Link>

          <Link to='/users'>
            <span> Users </span>
          </Link>
      {user ? logoutForm():<LoginForm /> }
      </div>
    )
  }
  
  return(
    <div>
      <NavBar />
      <h2> Blogs app </h2>
      <Notification /> 
      <Switch>
        <Route path='/users/:id'>
          <User users={users} />
        </Route>
        <Route path='/users'>
         <UsersPage users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <Blog user={user} />
        </Route>
        <Route path='/'>
          <IndexPage />
        </Route>
      </Switch>
    </div>
  )
}
export default App
