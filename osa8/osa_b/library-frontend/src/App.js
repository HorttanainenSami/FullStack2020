import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Login from './components/Login'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const client = useApolloClient()
  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 2*1000)
  }
  useEffect(() => {
    const storedToken = localStorage.getItem('blog-user')
    if(storedToken){
      setToken(storedToken)
    }
  }, [])
  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem('blog-user', token)
    setPage('authors')
  }
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? <button onClick={() => setPage('add')}>add book</button>: <button onClick={() => setPage('login')}> login </button>}
      { token && <button onClick={logout}> logout</button>}
      </div>
      <Notification notification={notification} />
      <Authors
        show={page === 'authors'}
        notify={notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />
      
      <Login
        show={page === 'login'}
        setToken={handleLogin}
        setError={notify}
      />

    
    </div>
  )
}

export default App
