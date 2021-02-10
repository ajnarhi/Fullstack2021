import React from 'react'
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
      <p>Hello {props.name} you are {props.age} old</p>
    </div>
  )
}

const Annu = (props) => {
  return (
    <div>
      <p>Annu Testaa</p>
      <p> Annun ikä on {props.age}</p>
      </div>
  )
}
const App = () => {
  const nimi='Pekka'
  const ika=54
  return (
   

    <div>
      <h1>Greetings</h1>
      <Hello name="Annu" age={10+24}/>
      <Hello name={nimi} age={ika}/>
      <Annu age="34" />
      <Annu age={ika}/>
    </div>
  )
}

export default App