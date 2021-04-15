import React from 'react'
const Notification = ({message}) =>{
  if (message === null){
    return null
  }
  const errorStyle={
    color:'green',
    fontStyle:'italic',
    fontSize:32,
    borderStyle:'solid',
    borderRadius:'5px',
    padding:'10px',
    marginBottom:'10px'
  }
  if (message.includes('already')) errorStyle.color='red' 
  
  return (
    <div>
      <p style={errorStyle}>{message}</p>
    </div>
    )
}

export default Notification
