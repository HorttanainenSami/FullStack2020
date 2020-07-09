import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	  const course = {
	    name: 'Half Stack application development',
	    parts: [
	      {
		name: 'Fundamentals of React',
		exercises: 10
	      },
	      {
		name: 'Using props to pass data',
		exercises: 7
	      },
	      {
		name: 'State of a component',
		exercises: 14
	      }
	    ]
	  }
	return (
		<>
			<Header course={course} /> 
			<Content course={course}/> 
			<Total course={course}/>
		</>
	)
}

const Header=(props)=>{
	return(
		<div>
			<h1>{props.course.name}</h1>
		</div>
	)
}
const Content =(props)=>{
	return (
		<div>
			<Part p={props.course.parts[0]} />
			<Part p={props.course.parts[1]} />
			<Part p={props.course.parts[2]} />
		</div>
	)
}
const Total = (props)=>{
	let total=0;
	for(let part of props.course.parts){
		console.log(part.exercises);
		total+=part.exercises;
	}
	return(
		<div> 
			<p>Number of exercises {total}</p>
		</div>
	)
}
const Part =(props)=>{
	return(
		<div>
			<p>{props.p.name} {props.p.exercises}</p>
		</div>
)
}
ReactDOM.render(<App />, document.getElementById('root'))
