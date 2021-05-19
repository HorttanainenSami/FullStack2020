import React from 'react'
import { incrementVote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdote.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())).sort((a,b) => b.votes-a.votes))
  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    await dispatch(incrementVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}' was success`, 10 ))
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
export default AnecdoteList
