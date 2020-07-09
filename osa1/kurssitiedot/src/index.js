import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
	const course = 'Half Stack application development'
	const part1 = {
		name: 'Fundamentals of React',
		exercises: 10
	}
	const part2 = {
	    name: 'Using props to pass data',
	    exercises: 7
	}
	const part3 = {
	    name: 'State of a component',
	    exercises: 14
	}
	return (
		<>
			<Header course={course} /> 
			<Content p1={part1} p2={part2} p3={part3} /> 
			<Total total={part1.exercises+part2.exercises+part3.exercises} />
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
			<Part p={props.p1} />
			<Part p={props.p2} />
			<Part p={props.p3} />
		</div>
	)
}
const Total = (props)=>{
	return(
	<div> 
		<p>Number of exercises {props.total}</p>
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
