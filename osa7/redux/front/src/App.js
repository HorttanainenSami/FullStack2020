import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin} from './reducers/login'
import { getUsers } from './reducers/users'
import User from './components/pages/User'
import UsersPage from './components/pages/UsersPage'
import { initializeBlogs } from './reducers/blogs'
import Blog from './components/pages/Blog'
import NavBar from './components/NavBar'
import Index from './components/pages/Index'
const App = () => {

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkLogin())
  }, [dispatch])
  useEffect(() => {
    dispatch(getUsers()) 
  }, [dispatch, blogs])
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  
  return(
    <div>
      <NavBar user={user}/>
      <h2> Blogs app </h2>
      <Notification /> 
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
         <UsersPage />
        </Route>
        <Route path='/blogs/:id'>
          <Blog user={user} />
        </Route>
        <Route path='/'>
          <Index user={user} />
        </Route>
      </Switch>
    </div>
  )
}
export default App
