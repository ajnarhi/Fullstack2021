import React from 'react'

const Course = ({ course }) => {

  console.log('coursen propsit', course)
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log('content propsit', props)
  return (
    <div>
      <span>
        {props.parts.map(part =>
          <Part key={part.id} name={part.name} exercise={part.exercises} />
        )}
      </span>
    </div>
  )
}

const Total = (props) => {
  console.log('yhteenlaskettu määrä', props)

  const total = props.parts.reduce( (s, p) => {
    console.log('what is happening', s, p)
    return s+p.exercises 
  }, 0)
  
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

const Part = (props) => {

  return (
    <div>
      <p>
        {props.name} {props.exercise}
      </p>
    </div>
  )
}

export default Course