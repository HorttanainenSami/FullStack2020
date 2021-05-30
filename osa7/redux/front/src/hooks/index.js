import { useState } from 'react'
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }
  
  return {
    onChange,
    value,
    type
  }
}



export default useField
