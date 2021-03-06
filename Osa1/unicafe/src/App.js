import React, { useState } from 'react'

const Headline = (props) => {
  return (
    <div>
    <h1>{props.headline}</h1>
    </div>
  )
}

const Statistics = (props) => {

  const allFeedback= (props.goodValue+props.neutralValue+props.badValue)
  const averageFeedback = (props.goodValue*1 + props.badValue * (-1)) / allFeedback
  const goodPercentageFeedback = ((props.goodValue)/allFeedback)*100

  if (props.goodValue===0 && props.neutralValue===0 && props.badValue===0){
    return(
    <div>
      <h2>{props.statistics}</h2>
      <p>No feedback given!</p></div>
    )
  }
  return  (

   
    
    <div>

<h2>{props.statistics}</h2>
    
    <table>
      <tbody>
    <StatisticLine text="Good" value={props.goodValue}/>
  
    <StatisticLine text="Neutral" value={props.neutralValue}/>
    
    <StatisticLine text="Bad" value={props.badValue}/>
  
    <StatisticLine text="All" value={allFeedback}/>
    
    <StatisticLine text="Average" value={averageFeedback}/>
   
    <StatisticLine text="Positive feedback given" value={goodPercentageFeedback + "%"} />

    </tbody>
    </table>
    </div>

  )
}

const StatisticLine=(props)=> {
  return (
    <tr>
    <td>{props.text}</td> <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {




  const headline = 'Give feedback!'
  const statistics = 'Statistics'
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)

  

  return (
    <div>
      <Headline headline={headline} />

      <Button  handleClick={increaseGoodByOne}
        text='Good'/>
      <Button handleClick={increaseNeutralByOne}
        text='Neutral'/>
      <Button handleClick={increaseBadByOne}
        text='Bad'/>

      <Statistics statistics={statistics} goodValue={good} neutralValue={neutral} badValue={bad}/>

      
    
    </div>
  )
}

export default App
