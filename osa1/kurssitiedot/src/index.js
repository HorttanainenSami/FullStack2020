import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
	<div>
		<Header course={course} /> 
		<Content p1={part1} e1={exercises1}  p2={part2} e2={exercises2} p3={part3} e3={exercises3}/> 
		<Total total = {exercises1+ exercises2 + exercises3} /> 
	</div>
  )
}

const Header=(props)=>(
	<div>
		<h1>{props.course}</h1>
	</div>
)
const Content =(props)=>(
	<div>
		<p>{props.p1} {props.e1}</p>
		<p>{props.p2} {props.e2}</p>
		<p>{props.p3} {props.e3}</p>
	</div>
)
const Total = (props)=>(
	<div> 
		<p>Number of exercises {props.total}</p>
	</div>
)

ReactDOM.render(<App />, document.getElementById('root'))
