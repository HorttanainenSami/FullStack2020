import React, { useState, useEffect } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const query = gql`
    query {
      allAuthors{
        name,
        born,
        bookCount
      }
    }
`
const Authors = (props) => {
  const [authors, setAuthor] = useState([]) 
  const [getAuthors, result] = useLazyQuery(query)
  useEffect(() => {
    getAuthors()
  },[])
  useEffect( () => {
    if(result.data) {
      setAuthor(result.data.allAuthors)
    }
  },[result])
  if (!props.show) {
    return null
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
