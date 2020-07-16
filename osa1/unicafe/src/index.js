import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good,neutral,bad})=>{
	let all= good+neutral+bad;
	let average = (bad*(-1))+good;
if(all===0){
return(<div>
<h1>Statistics</h1>
<p>No feedback Given</p>
</div>)
}
return(
	<div>
		<h1>Statistics</h1>
		<p> Good {good}</p>
		<p> Neutral {neutral} </p>
		<p> Bad {bad} </p>
		<p> All {all} </p>
		<p> Average {all===0?0:average/all} </p>
		<p> Positive {all===0?0:(good/all)*100}% </p>
	</div>
)

}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
const increaseGood=()=>{
	setGood(good+1)
}
const increaseNeutral=()=>{
	setNeutral(neutral+1)
}
const increaseBad=()=>{
	setBad(bad+1)
}


  return (
    <div>
	<h1> give feedback</h1>
	<button onClick={increaseGood}>good</button>
	<button onClick={increaseNeutral}>neutral</button>
	<button onClick={increaseBad}>bad</button>
	<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
