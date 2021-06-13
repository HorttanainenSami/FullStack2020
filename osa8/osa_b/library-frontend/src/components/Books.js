import { useLazyQuery, gql } from '@apollo/client'
import React, { useState, useEffect } from 'react'
const query = gql`
  query {
    allBooks{title,author,published}
  }
`
const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(query)

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
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books