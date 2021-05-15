import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])
  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'))
    if (storedUser) {
      setUser(storedUser)
      blogService.setToken(storedUser.token)
    }
  }, [])
  const notify = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const handleLogin = async (loginObject) => {
    try {
      const loginUser = await loginService.login(loginObject)
      saveLoggedinUser(loginUser)
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }
  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }
  const saveLoggedinUser = (user) => {
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
  }
  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(newBlog))
      notify(`${newBlog.title} added to server`)
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }
  const deleteBlog = async (id) => {
    console.log(`remove ${id}`)
    //delete blog from server
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notify('removing blog was successful')
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
    //delete blog from state
  }
  const increaseLikes = async (blogObject) => {
    const response = await blogService.update(blogObject)
    setBlogs(blogs.map(blog => blog.id === response.id ? response : blog))
  }
  const blogFormRef = useRef()
  const loggedinView = () => (
    <>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout </button>
      </div>
      <Toggleable buttonLabel='create new' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Toggleable>
      {showBlogs()}
    </>
  )
  const showBlogs = () => {

    const compareTo = (first, second) => {
      return second.likes-first.likes
    }
    return(
      <ul>
        {blogs.sort(compareTo).map(blog => <Blog key={blog.id} increase={increaseLikes} blog={blog} removeFromServer={deleteBlog} user={user} />)}
      </ul>
    )
  }
  return (
    <div>
      <Notification notification={notification} />
      <h1> Blogs application </h1>
      {user === null
        ? <Toggleable buttonLabel='login'>
          <LoginForm login={handleLogin} />
        </Toggleable>
        : loggedinView()}
    </div>
  )
}

export default App
