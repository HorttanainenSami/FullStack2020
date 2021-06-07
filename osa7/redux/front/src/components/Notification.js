import React from 'react'
import { useSelector } from 'react-redux'
import Alert from '@material-ui/lab/Alert'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  if ( !notification ) {
    return null
  }

  const style = notification.type === 'success' ? 'success' : 'error' 

  return <Alert severity={style}>
    {notification.message}
  </Alert>
}

export default Notification
