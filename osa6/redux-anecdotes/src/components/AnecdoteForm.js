import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(newAnecdote(content))
    dispatch(setNotification(`Creting ${content} anecdote was success` ))
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
