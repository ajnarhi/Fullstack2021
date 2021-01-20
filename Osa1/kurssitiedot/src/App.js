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
      <Part part1={props.part1.name} exercise1={props.part1.exercises}/>
      </p>
      <p>
      <Part part2={props.part2.name} exercise2={props.part2.exercises}/>
      </p>
      <p>
      <Part part3={props.part3.name} exercise3={props.part3.exercises}/>
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
  //const course = 'Half Stack application development'
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  //const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exercises = [10, 7, 14]
  

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total amount={exercises}/>
    </div>
  )
}

export default App
