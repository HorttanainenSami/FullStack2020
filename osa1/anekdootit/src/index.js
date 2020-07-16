import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Best =(props)=>{
	let most=0;
	for(let i=0; i<props.anecdotes.length; i++){
		if(props.points[i]>props.points[most]){
			most=i;
		}
	}

	return(
		<div>
			{props.anecdotes[most]}
		</div>
	)
}
const App = (props) => {
	const [selected, setSelected] = useState(0)
	const [points,setPoints]=useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

	function getRandom(max){
		return Math.floor(Math.random()*Math.floor(max));
	}
	const handleClick=()=>{
		setSelected(getRandom(anecdotes.length));
	}
	const increaseVote=()=>{
		const copy =[...points];
		copy[selected]+=1;
		setPoints(copy);
	}
	  return (
	    <div>
			<p> {props.anecdotes[selected]}</p>
			<p> has {points[selected]} votes</p>
			<p> <button onClick={increaseVote}> vote</button>
			<button onClick={handleClick}>next anecdot</button></p>

			<Best anecdotes={anecdotes} points={points} />
	    </div>
	  )
	}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
