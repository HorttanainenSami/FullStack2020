import  { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event, action='input') => {
    switch(action){
      case 'input':
        return setValue(event.target.value) 
      case 'reset':
        return setValue('')
  default:
        return;
    }

  }
  return{
    onChange,
    value,
    type,
  }
}
