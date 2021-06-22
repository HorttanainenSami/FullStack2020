import { useLazyQuery } from '@apollo/client'
import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
function reducer(accumalator, current) {
  let add = []
  for(const genre in current){
    if (!accumalator.includes(current[genre].toLowerCase())) {
      add.push(current[genre].toLowerCase()) 
    }
  }
  return add.length === 0 ? accumalator: accumalator.concat(add)
}
const Books = (props) => {
  const [books, setBooks] = useState([])
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [filter, setFilter] = useState('')

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
  const booksToShow = () => {
    if(books.length === 0 ){
      return books
    }
   return (
     filter === '' 
     ? books 
     : books.filter(book => book.genres.includes(filter))
   )
  }
  return (
    <div>
      <h2>books</h2>

      <div>
      Filter by genre 
        <select value={filter} onChange={({ target }) => setFilter(target.value)}>
          <option value=''>- </option>
          { books.map(book => book.genres).reduce(reducer ,[] ).map(genre => <option value={genre} key={genre}> {genre} </option>)}
        </select>
      </div>
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
          {booksToShow().map(a =>
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
