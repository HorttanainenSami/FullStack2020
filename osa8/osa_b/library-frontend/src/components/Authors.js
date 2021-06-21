import React, { useState, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [authors, setAuthors] = useState([]) 
  const [getAuthors, result] = useLazyQuery(ALL_AUTHORS)
  const [setBirthYear, updateResult] = useMutation(SET_BIRTHYEAR,{
    refetchQueries: [{ query: ALL_AUTHORS }]})
  const [birthYear, setBirthyear ] = useState('')
  const [author, setAuthor] = useState('')

  useEffect(() => {
    getAuthors()
  },[])

  useEffect(() => {
    if(result.data) {
      setAuthors(result.data.allAuthors)
      setAuthor(result.data.allAuthors[0].name)
    }
  },[result])
  
  useEffect(() => {
    if (updateResult.data && updateResult.data.editAuthor === null) {
      props.notify('Author not found')
    }
  }, [updateResult.data])
  if (!props.show) {
    return null
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setBirthYear({variables: { author, birthYear}})
    setBirthyear('')
  }

  return (
    <div>
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

      <div>
        <h2> set birthyear </h2>
      <form onSubmit={handleSubmit}>
        <div>
        name
        <select value={author} onChange={({ target }) => setAuthor(target.value)}>
          {authors.map(a => <option key={a.name} value={a.name}> {a.name} </option>)}
        </select>
        </div>
        <div>
        birthyear
        <input value={birthYear} onChange={({ target }) => setBirthyear(parseInt(target.value))} type='number'/>
        </div>
        <button type='submit'>update author </button>
      </form>
      </div>
    </div>
  )
}

export default Authors
