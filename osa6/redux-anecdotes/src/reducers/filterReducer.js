export const changeFilter = (value) => {
  return{
    type: 'CHANGE_FILTER',
    data: value,
  }
}
const reducer = (state = '', action) => {
    switch(action.type){
      case 'CHANGE_FILTER':
        return action.data
      default:
        return state
    }

}

export default reducer
