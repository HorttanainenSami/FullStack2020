import React from 'react'

const Anecdote = ({ anecdote }) => {
  if( !anecdote) {
    return(
    <div>
      not found
    </div>
    )
  }
  return(
    <div> 
      <h2> {anecdote.content} by {anecdote.author} </h2>
      <div> has {anecdote.votes} votes </div>
      <br />
      <div> for more information see <a href={anecdote.info}>{anecdote.info}</a></div>
      <br />
    </div>
  )
}

export default Anecdote
