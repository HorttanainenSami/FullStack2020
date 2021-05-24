import { useState, useEffect } from 'react'
import axios from 'axios'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}
export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [search, setSearch] = useState(name)
  const fetch = () => {
    console.log(name)
    setSearch(name)}

  useEffect(() => {
    const baseUrl = `https://restcountries.eu/rest/v2/name/${search}?fullText=true`
    axios.get(baseUrl)
      .then(response => {
        setCountry(
          {data:{...response.data[0]},
            found:true}
      )})
    .catch(err =>{
      setCountry({country:{found:null}})})
  }, [search])

  return {
    country,
    fetch,
    search
  }

}
