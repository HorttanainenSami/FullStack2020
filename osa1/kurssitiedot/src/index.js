import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	const course = 'Half Stack application development'
	const parts = [
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
	return (
		<>
			<Header course={course} /> 
			<Content parts={parts}/> 
			<Total parts={parts}/>
		</>
	)
}

const Header=(props)=>{
	return(
		<div>
			<h1>{props.course}</h1>
		</div>
	)
}
const Content =(props)=>{
	return (
		<div>
			<Part p={props.parts[0]} />
			<Part p={props.parts[1]} />
			<Part p={props.parts[2]} />
		</div>
	)
}
const Total = (props)=>{
	let total=0;
	for(let part of props.parts){
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
