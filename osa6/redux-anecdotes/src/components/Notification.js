import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const render = () => (
    <div style={style}>
      {notification.message}
    </div>
  )
  return (
    <>
      {notification.message && render()}
    </>
  )
    
}

export default Notification
