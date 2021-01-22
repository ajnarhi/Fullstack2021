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
    <tr>
    <StatisticLine text="Good" value={props.goodValue}/>
    </tr>
    <tr>
    <StatisticLine text="Neutral" value={props.neutralValue}/>
    </tr>
    <tr>
    <StatisticLine text="Bad" value={props.badValue}/>
    </tr>
    <tr>
    <StatisticLine text="All" value={allFeedback}/>
    </tr>
    <tr>
    <StatisticLine text="Average" value={averageFeedback}/>
    </tr>
    <tr>
    <StatisticLine text="Positive feedback given" value={goodPercentageFeedback + "%"} />
    </tr>
    </table>
    </div>
  )
}

const StatisticLine=(props)=> {
  return (
    <td>{props.text} {props.value}</td>
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
