export const incrementVote = (id) => {
  return {
    type: 'INCREMENT_VOTE',
    data:{ id }
  }
}
export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data:  content,
  }
}
export const initializeAnecdotes = (content) => {
  return {
    type: 'INITIALIZE_ANECDOTES',
    data:  content ,
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INCREMENT_VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes+=1} : anecdote)  
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
