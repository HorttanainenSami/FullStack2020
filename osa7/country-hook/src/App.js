import React from 'react'
import { useField, useCountry } from './hooks/index'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const country = useCountry(nameInput.value)
  const fetch = (e) => {
    e.preventDefault()
    console.log('click')
    country.fetch(nameInput.value) 
    console.log(country.search)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button onClick={fetch}>find</button>
      </form>

      <Country country={country.country} />
    </div>
  )
}

export default App
