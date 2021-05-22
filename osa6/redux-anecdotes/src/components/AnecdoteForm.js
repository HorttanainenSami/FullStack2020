import React from 'react'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.newAnecdote(content)
    props.setNotification(`Creting ${content} anecdote was success`, 10 )
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
const mapStatesToProps = {
  newAnecdote,
  setNotification,
}

export default connect(null, mapStatesToProps)(AnecdoteForm)
