import React from 'react'
import ReactDOM from 'react-dom'



const Course=({course})=>(
	<div>
		<Header course={course} />
		<Content course={course} />
		<Total course={course} />
	</div>
)


const Courses=({courses})=>(
	courses.map(course=> 
		<Course course={course} key={course.id} />)
)

const Header=({course})=>(
	<div>
		<h2>{course.name}</h2>
	</div>
)

const Content =({course})=>(
	<div>
		{course.parts.map(part=>
			 <Part part={part} key={part.id} />)}
	</div>
)

const Total = ({course})=>{
	let total=course.parts.reduce(
		(acc, curValue)=>
			 acc+curValue.exercises
		 ,0);

	return(
		<div> 
			<p><b>Total of {total} exercises </b></p>
		</div>
	)
}
const Part =({part})=>(
		<div>
			<p>{part.name} {part.exercises}</p>
		</div>
)
export default Courses;
