import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { useDispatch, useSelector } from 'react-redux'
import blogService from './services/blogs'
import loginService from './services/login'
import { setNotification } from './reducers/notification'
import { loginUser, logoutUser, checkLogin } from './reducers/login'
import useField from './hooks/index'
import { initializeBlogs, updateBlog } from './reducers/blogs'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      dispatch(initializeBlogs(blogs))}
    )
  }, [])

  useEffect(() => {
    dispatch(checkLogin(user))
  }, [])

  const notifyWith = (message, type='success') => {
    dispatch(setNotification({ message, type }))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log(username.value)
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })
      dispatch(loginUser(user))
      notifyWith(`${user.username} welcome back!`)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      //setBlogs(blogs.concat(newBlog))
      notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    const returned = await blogService.update(likedBlog)
    dispatch(updateBlog(returned))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
      notifyWith('blog removed successfully')
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
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

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App
