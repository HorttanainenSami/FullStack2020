import react from 'react'

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
export default countries;
