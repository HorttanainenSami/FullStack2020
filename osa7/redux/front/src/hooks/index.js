import { useState } from 'react'
import axios from 'axios'
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return ([
      {
        onChange,
        value,
        type
      },
      reset
    ])
  
}
export default useField
