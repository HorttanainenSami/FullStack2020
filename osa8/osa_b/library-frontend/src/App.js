import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'


const App = () => {
  const [page, setPage] = useState('authors')
  const [notification, setNotification] = useState(null)
  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 2*1000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
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
      />

    
    </div>
  )
}

export default App
