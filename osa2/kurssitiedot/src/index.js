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

const App = () => {
const courses = [
    {
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
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
	<h1>Web development curriculum </h1> 
        <Courses courses={courses} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
