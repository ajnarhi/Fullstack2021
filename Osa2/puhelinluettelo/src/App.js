import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter = (props) => {

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    props.setFilteredName(event.target.value)
  }

  

  return (
    <form>
      <div>
        Filter: <input value={props.filteredName} 
        onChange={handleFilterChange} />
      </div>
    </form>
  )
}



const PersonForm = (props) => {


  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (props.persons.some(p => p.name === props.newName)) {
      alert(props.newName + ' is already added to phonebook')
      props.setNewName('')
      props.setNewNumber('')
    } else {

      const personObject = {
        name: props.newName,
        number: props.newNumber
      }

      axios
    .post('http://localhost:3001/persons', personObject)
    .then(response => {
      console.log(response)
      props.setPersons(props.persons.concat(response.data))
      props.setNewName('')
      props.setNewNumber('')
    })

     
    }
  }

  return (
    <form onSubmit={addNumber}>
      <div>
        Name: <input value={props.newName}
          onChange={props.handleNameChange} />
      </div>
      <div>Number: <input value={props.newNumber}
        onChange={props.handleNumberChange} /></div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>


  )

}


const Persons = (props) => {

  const deleteThisPerson = (id, name) => {
    if (window.confirm(`Do you really want delete ${name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {

          props.setPersons(props.persons.filter(n => n.id !== id))
        }
        )



    }
  }

  const DeleteButton = (props) => {
    return(

    <button onClick={()=>deleteThisPerson(props.person.id, props.person.name)}>Delete</button>
    )
  }

  if (props.filteredName===''){
  return (
    <div>
      {props.persons.map(person =>
        <li key={person.name}> 
          {person.name} {person.number}  {} 
        
        <DeleteButton person={person}/>
        </li>
      )
      }</div>

  )
}else{
  return(
    <div>
  {props.persons.filter(person => person.name.includes(props.filteredName)).map(person =>
        <li key={person.name}>
          {person.name} {person.number} {} 
        
        <button onClick={()=>deleteThisPerson(person.id, person.name)}>Delete</button>
        </li>

      )}
  </div>)
}

}




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName]=useState ('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')



  return (
    <div>
      <h2>Phonebook</h2>

      <h2>Filter phonebook</h2>
      <Filter persons={persons} filteredName={filteredName} setFilteredName={setFilteredName}/>

      <h2>Add new person to phonebook</h2>

      <PersonForm newName={newName} newNumber={newNumber} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filteredName={filteredName} setPersons={setPersons} />
    </div>
  )
 

}

export default App
