import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import Login from './components/Login'
import Recomended from './components/Recomended'
import { ME, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)
  const [userBooks, setUserBooks] = useState(null)
  const client = useApolloClient()
  const [loggedUser, result] = useLazyQuery(ME)
  const [getBooks, bookResult] = useLazyQuery(ALL_BOOKS)
  useEffect(() => {
    const storedToken = localStorage.getItem('blog-user')
    if(storedToken){
      setToken(storedToken)
      loggedUser()
    }
  }, [])
  const updateCacheWith = (addedPerson) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    const includedIn = (set, object) => {
      const a = set.filter(book => book.id === object.id)
      return a.length !== 0 
    }
    console.log(dataInStore)
    console.log(addedPerson)
    console.log(includedIn(dataInStore.allBooks, addedPerson))
    if(!includedIn(dataInStore.allBooks, addedPerson)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedPerson)}
      })
    }
  }
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book is added `)
      const addedPerson = subscriptionData.data.bookAdded
      updateCacheWith(addedPerson)
    }
  })

  useEffect(() => {
    if(result.data){
      setUser(result.data.me) 
    }
  },[result])

  useEffect(() => {
    if(user){
      getBooks({ variables: {genre: user.favoriteGenre}}) 
    }
  }, [user])

  useEffect(() => {
    if(bookResult.data){
      console.log(bookResult.data.allBooks)
      setUserBooks(bookResult.data.allBooks)
    }
  }, [bookResult])
  
  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 2*1000)
  }
  const handleLogin = (token, username) => {
    setToken(token) 
    localStorage.setItem('blog-user', token)
    setPage('authors')
    loggedUser()
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
    { token && <button onClick={() => setPage('recomended')}>recomended</button> }
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
      <Recomended
        show={page === 'recomended'}
        user={user}
        books={userBooks}
        
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
