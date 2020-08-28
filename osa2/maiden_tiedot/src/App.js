import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios'

const DisplayCountry=({country})=>{
	const [weather, setWeather] = useState(false);
	useEffect(()=>{
		axios.get('http://api.weatherstack.com/current?access_key=bf222ed685b474477d922050135957fc&query='+ country.capital)
		.then(response=>{
			console.log(response)	
			if(response.data.includes('error')){
				console.log('error')
			}
		})


	}
		,[country.name])	
	return(
		<div>
			<h1> {country.name}</h1>
			<p>capital {country.capital} </p>
			<p>population {country.population} </p>
			<h2> languages </h2>
			<ul>{country.languages.map(language=><li key ={language.name}> {language.name} </li>)} </ul>
			<img src={country.flag} alt='flag' width="150"/>
						
			
		</div>
	)
}
	

const DisplayMultipleCountries=({country,handleClick})=>( 
	<li>{country.name} <button onClick={handleClick} value= {country.name}>show</button></li>
)

const Countries=({countries,setShow, showCountry})=>{
	
	const handleClick=(event)=> setShow(showCountry.concat(event.target.value));
	if(countries.length>10){
		return(
			<div>
			Too many matches, specify another filter
			</div>
		)
	}if(countries.length===1){
		return(
			<DisplayCountry country={countries[0]} />
		)
	}if(showCountry.length!==0){
		const ret=countries.filter(country=>country.name.includes(showCountry));
		return(
			<DisplayCountry country={ret[0]} />
		)
	}
	else{
		return (
			<div>
			{countries.map(country=>
				<DisplayMultipleCountries 
					key={country.name} 
					country={country} 
					handleClick={handleClick} 
				/>)
			}
			</div>
		)
	}
}
function App() {
	const [filtered, setFiltered]=useState([]);
	const [countries, setCountries]=useState([]);
	const [showCountry, setShow]=useState([]);
	const handleChange=(event)=>{
		let filteredCountries = countries.filter(obj=>obj.name.toLowerCase().includes(event.target.value.toLowerCase()));
		setFiltered(filteredCountries)
		setShow([]);
	}
	useEffect(()=>{
		axios.get('https://restcountries.eu/rest/v2/all')
		.then(response=>{
			setCountries(response.data)
			setFiltered(response.data) })
	},[])


  return (
	 <div>
		find countries <input onChange={handleChange}/>
		<Countries countries={filtered} showCountry={showCountry} setShow={setShow}/>
	  </div>
  )
}

export default App;
