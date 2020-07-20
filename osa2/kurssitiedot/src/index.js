import React from 'react'
import ReactDOM from 'react-dom'

const Course=({course})=>{
return(
<div>
	<Header course={course} />
	<Content course={course} />
	<Total course={course} />
</div>

)
}
const Header=({course})=>{
	return(
		<div>
			<h1>{course.name}</h1>
		</div>
	)
}
const Content =({course})=>{
	return (
		<div>
			{course.parts.map(part=> <Part part={part} key={part.id} />)}
		</div>
	)
}
const Total = ({course})=>{
	let total=course.parts.reduce(
	(acc, curValue)=>
	 acc+curValue.exercises ,0);

	return(
		<div> 
			<p><b>Total of {total} exercises </b></p>
		</div>
	)
}
const Part =({part})=>{
	return(
		<div>
			<p>{part.name} {part.exercises}</p>
		</div>
)
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'state of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }


    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
