import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll()
      .then(initialBlogs => {
        console.log(initialBlogs)
        setBlogs(initialBlogs)
      })
  }, [])
  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('loggedBlogUser')))
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`login with username ${username} and pass ${password}`)
    try {
      const loginUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loginUser))
      setUser(loginUser)
      console.log(loginUser)
    } catch (exception) {
      console.log('Invalid credentials')
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
        <button onClick={handleLogout} >logout </button>
      </div>
      <div>
        {blogs.map(note => <Blog blog={note} />)}
      </div>
    </div>
  )
  return (
    <div>
      {user === null
        ? loginForm()
        : loggedinUI()}
    </div>
  )
}

export default App
