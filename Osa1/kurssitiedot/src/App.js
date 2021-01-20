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
  console.log(props)
  return (
    <div>
      <p>
      <Part part1={props.parts[0].name} exercise1={props.parts[0].exercises}/>
      </p>
      <p>
      <Part part2={props.parts[1].name} exercise2={props.parts[1].exercises}/>
      </p>
      <p>
      <Part part3={props.parts[2].name} exercise3={props.parts[2].exercises}/>
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
      Number of exercises {props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}
      </p>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <div>
    <p>
      {props.part1} {props.exercise1}
    </p>
      <p>
      {props.part2} {props.exercise2}
    </p>
      <p>
      {props.part3} {props.exercise3}
    </p>
    </div>
  )
}

const App = () => {
  
  const course = 'Half Stack application development'


  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
 
  

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  )
}

export default App
