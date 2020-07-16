import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticsLine=({text,value})=>(
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>
)
const Statistics = ({good,neutral,bad})=>{
	let all= good+neutral+bad;
	let average = ((bad*(-1))+good)/all;
	let positive =(good/all)*100+'%';
if(all===0){
	return(
		<div>
			<p>No feedback Given</p>
		</div>)
	}
return(
	<div>
		<table>
		<tbody>
		<StatisticsLine text='Good' value={good} />
		<StatisticsLine text='Neutral' value={neutral} />
		<StatisticsLine text='Bad' value={bad} />
		<StatisticsLine text='All' value={all} />
		<StatisticsLine text='Average' value={average} />
		<StatisticsLine text='Positive' value={positive} />
		</tbody>
		</table>
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
	<h1> Statistics</h1>
	<Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
