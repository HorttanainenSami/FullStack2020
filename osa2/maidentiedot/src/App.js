import React, {useState, useEffect} from 'react'
import axios from 'axios'
const Country = ({ country }) =>{
  const [ weather, setWeather ] = useState([])
  const api_key= process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}&units=m`
  useEffect( ()=>{
     axios
    .get(url)
    .then(response => setWeather(response.data))
  },[url])

  if(weather.length!==0){
    console.log(weather)
    return(
  <div>
    <h2> {country.name} </h2>
    <p> Capital: {country.capital}  </p>
    <p> Population: {country.population} </p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map(language=><li key={language.name}> {language.name} </li>)}
    </ul>
    <img alt ='flag' width='200' src={country.flag}/>
      <h2> Weather in {country.capital}</h2>
        <p> temperature: {weather.current.temperature} Celcius </p>
        {weather.current.weather_icons.map(icon => <img key={icon} alt='icon' src={icon} />)}
        <p> wind: {weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
  </div>
    )
  }
  return(
  <div>
    <h2> {country.name} </h2>
    <p> Capital: {country.capital}  </p>
    <p> Population: {country.population} </p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map(language=><li key={language.name}> {language.name} </li>)}
    </ul>
    <img alt ='flag' width='200' src={country.flag}/>
  </div>
  )
}
const Countries =({ countries,handleButton }) =>{
  if (countries.length>10){
    return( <p> Too many matches, specify another filter </p>)
  }else if(countries.length===1){
    return( <Country country={countries[0]} />)
  }
  return (
    <div>
      {countries.map(country => <p key={country.name}> {country.name} <button onClick={handleButton} id={country.name} >show</button></p> )}
    </div>
  )
}
const App=()=> {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  useEffect(()=>{
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountries(response.data))
  },[])

  const handleFilter = (event) => setFilter(event.target.value)
  const handleButton = (event) => setFilter(event.target.id)
  const countriesToShow = filter===''
    ?countries
    :countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
    <h2> filter </h2>
    <input onChange={handleFilter} value={filter} />
      {countries.length===0?'Ladataan': <Countries countries={countriesToShow} handleButton={handleButton} /> }
    </div>
  )
}

export default App;
