import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`login with username ${username} and pass ${password}`)
    try {
      const loginUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loginUser))
      blogService.setToken(loginUser.token)
      setUser(loginUser)
    } catch (exception) {
      notify(exception.response.data.error, 'error')
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(newBlog))
      notify(`${newBlog.title} added to server`)
    } catch (exception) {
      notify(exception.response.data.error)
    }
  }
  const handleLogout = () => {
    console.log('logout')
    setUser(null)
    window.localStorage.clear()
  }
  const loginForm = () => (
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const loggedinUI = () => (
    <div>
      <h1>blogs</h1>
      <div>
        {user.username} logged in 
        <button onClick={handleLogout}>logout </button>
      </div>
      <h1> create new </h1>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      <div>
        {blogs.map(note => <Blog blog={note} />)}
      </div>
    </div>
  )
  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? loginForm()
        : loggedinUI()}
    </div>
  )
}

export default App
