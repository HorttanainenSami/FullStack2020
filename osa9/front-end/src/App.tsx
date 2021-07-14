import React from 'react';
type Part = {
  name: string,
  exerciseCount: number
}
type exerciseCount = Omit<Part, 'name'>
interface ContentProps {
  courseParts: Part []
}
interface CourseParts {
  exerciseCounts: exerciseCount []
}
const Header = (props: {courseName: string}): JSX.Element => <h1> {props.courseName} </h1>
const Content = (props: ContentProps): JSX.Element => {
  return(
    <>
      {props.courseParts.map(part => <p key={part.name}> {part.name} {part.exerciseCount} </p>) }
    </>
  )
}
const Total = (props: CourseParts): JSX.Element => {
  return(
  <p>
    Number of exercises{" "}
    {props.exerciseCounts.reduce((accumulator, part) => part.exerciseCount + accumulator, 0)}
  </p>
  )
}
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const exerciseCount = courseParts.map((part) => ( {exerciseCount: part.exerciseCount} ))
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total exerciseCounts={exerciseCount} />
    </div>
  );
};

export default App;

