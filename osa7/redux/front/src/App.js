import React, { useEffect } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
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
import { Container } from '@material-ui/core'
import LoginForm from './components/LoginForm'
const App = () => {

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const match = useRouteMatch('/blogs/:id')
  const blog = match 
    ? blogs.find(blog => blog.id === match.params.id)
    : null

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
    <Container>
      <NavBar user={user}/>
      <Notification /> 
      <Switch>
        <Route path='/login'>
          { user ? <Index user={user}/> : <LoginForm />}
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
         <UsersPage />
        </Route>
        <Route path='/blogs/:id'>
          <Blog user={user} blog={blog} />
        </Route>
        <Route path='/'>
          <Index style={{width: '100%'}} user={user} />
        </Route>
      </Switch>
    </Container>
  )
}
export default App
