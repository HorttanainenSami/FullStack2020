import anecdotesService from '../services/anecdotes'

export const incrementVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch( {
      type: 'INCREMENT_VOTE',
      data: updatedAnecdote,
    })
  }
}
export const newAnecdote = (content) => {
  return async dispatch => {
    const newNote = await anecdotesService.createNew(content)
    dispatch( {
      type: 'NEW_ANECDOTE',
      data: newNote,
    })
  }
}
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {

  switch (action.type) {
    case 'INCREMENT_VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ? action.data : anecdote)  
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
