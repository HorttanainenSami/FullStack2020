import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getBooks()
  }, [])
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  },[result])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books
