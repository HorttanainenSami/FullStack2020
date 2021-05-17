import React from 'react'
import { newNote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(newNote(content))
  }


  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name='note' /></div>
        <button type='submit'>create</button>
      </form>
    </>
    )
}

export default AnecdoteForm
