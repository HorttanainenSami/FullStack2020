import React from 'react';
// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}
interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}
interface CourseSpecialPart extends CourseDescriptionPart {
  type: 'special';
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Part = (part : CoursePart) => {
  switch(part.type) {
    case('normal'):
      return(
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div> 
          <i>{part.description}</i>
        </>);
    case('groupProject'):
      return(
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div> 
          <div>project exercises {part.groupProjectCount}</div>
        </>);
    case('submission'):
      return(
        <>
          <div><b>{part.name} {part.exerciseCount}</b></div> 
          <i> {part.description} </i>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </>);
    case('special'):
      return(
        <>
          <div><b>{part.name} {part.exerciseCount} </b></div>
          <i>{part.description}</i>
        <div>Requirements: {part.requirements.reduce<string | JSX.Element>((prev, cur) => prev === '' ? cur: <>{prev}, {cur}</>, '')}</div>
        </>);
    default:
      return assertNever(part);
  }
}
const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`)
}
// this is the new coursePart variable
interface Part {
  name: string,
  exerciseCount: number
}
type exerciseCount = Omit<Part, 'name'>
interface ContentProps {
  courseParts: CoursePart []
}
interface CourseParts {
  exerciseCounts: exerciseCount []
}
const Header = (props: {courseName: string}): JSX.Element => <h1> {props.courseName} </h1>
const Content = (props: ContentProps): JSX.Element => {
  return(
    <>
      {props.courseParts.map(part => <Part key={part.name} {...part} />) }
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]
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

