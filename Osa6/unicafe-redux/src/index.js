import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

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


const App = () => {
  const statistics = 'Statistics'
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const neutral = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }


  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={neutral}>neutral</button>
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
      <Statistics statistics={statistics} goodValue={store.getState().good} neutralValue={store.getState().ok} badValue={store.getState().bad}/>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

