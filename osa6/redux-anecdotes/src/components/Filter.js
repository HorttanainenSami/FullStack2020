import React from 'react'
import { connect } from 'react-redux'
import { changeFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const setFilter = (value) => {
    props.changeFilter(value)
  }
return (
  <>
    Filter 
    <input name='filter' onChange={({target}) => setFilter(target.value)} value={props.filter} />
  </>
)
}
const mapDispatchToProps = (state) => ({
  filter: state.filter,
})
const mapStatesToProps = {
  changeFilter,
}
export default connect(mapDispatchToProps, mapStatesToProps)(Filter)
