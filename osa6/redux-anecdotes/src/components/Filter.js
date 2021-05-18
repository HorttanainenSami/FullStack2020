import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const setFilter = (value) => {
    dispatch(changeFilter(value))
  }
return (
  <>
    Filter 
    <input name='filter' onChange={({target}) => setFilter(target.value)} value={filter} />
  </>
)
}
export default Filter
