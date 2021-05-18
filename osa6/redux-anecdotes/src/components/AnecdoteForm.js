import React from 'react'
import { newNote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification, resetNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(newNote(content))
    dispatch(setNotification(`Creting ${content} note was success` ))
    setTimeout( () => {
      dispatch(resetNotification())
    }, 5000)
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
