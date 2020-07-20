import React from 'react'

const Course=({courses})=>(

  <div>
  {courses.map(course => (
    <div key={course.id}>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  ))}
  </div>
)

const Header=({course})=>(
	<div>
		<h2>{course.name}</h2>
	</div>
)

const Content =({course})=>(
	<div>
		{course.parts.map(part=> <Part key={part.id} part={part} />)}
	</div>
)

const Total = ({course})=>{
	let total=course.parts.reduce( (sum, value)=> sum+value.exercises ,0);

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
export default Course
