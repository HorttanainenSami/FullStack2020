import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
const [all, setAll]=useState(0)
const [average, setAverage]=useState(0)
const increaseGood=()=>{
	setGood(good+1)
	setAll(all+1)
	setAverage(average+1)
}
const increaseNeutral=()=>{
	setNeutral(neutral+1)
	setAll(all+1)
}
const increaseBad=()=>{
	setBad(bad+1)
	setAll(all+1)
	setAverage(average-1)
}


  return (
    <div>
	<h1> give feedback</h1>
	<button onClick={increaseGood}>good</button>
	<button onClick={increaseNeutral}>neutral</button>
	<button onClick={increaseBad}>bad</button>
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

ReactDOM.render(<App />, 
  document.getElementById('root')
)
