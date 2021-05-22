import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const render = () => (
    <div style={style}>
      {props.notification.message}
    </div>
  )
  return (
    <>
      {props.notification.message && render()}
    </>
  )
    
}
const mapStateToProps = (state) => ({
    notification: state.notification
})

export default connect(mapStateToProps)(Notification)
