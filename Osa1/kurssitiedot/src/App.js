import React from 'react'

const Header = (props) => {
  return (
    <div>
      <p>
      {props.course}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
      <Part part={props.parts[0]} exercise={props.exercises[0]}/>
      </p>
      <p>
      <Part part={props.parts[1]} exercise={props.exercises[1]}/>
      </p>
      <p>
      <Part part={props.parts[2]} exercise={props.exercises[2]}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.amount[0]+props.amount[1]+props.amount[2]}
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total amount={exercises}/>
    </div>
  )
}

export default App
