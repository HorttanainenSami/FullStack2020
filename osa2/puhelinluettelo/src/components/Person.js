import React from 'react'
const Person=({persons,filter})=>{
	const filtPersons=persons.filter(person=>
		person.name.toLowerCase().includes(
			filter.toLowerCase()));

	return(
		<div>
	  	{filtPersons.map(person=>
		  <li key={person.name}>
		  {person.name} {person.number}
		  </li>)}
		</div>
	)
}

export default Person;
