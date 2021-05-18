import React from 'react'
import { incrementVote} from '../reducers/anecdoteReducer'
import { setNotification, resetNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'


const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdote.sort((a, b) => b.votes-a.votes))
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(incrementVote(id))
    dispatch(setNotification(`You voted '${content}' was success` ))
    setTimeout( () => {
      dispatch(resetNotification())
    }, 5000)
  }

  return (
    <>
      {anecdotes.map(anecdote =>
         <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
export default AnecdoteList
