import React, { useState } from 'react'


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

      props.setPersons(props.persons.concat(personObject))
      props.setNewName('')
      props.setNewNumber('')
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
  if (props.filteredName===''){
  return (
    <div>
      {props.persons.map(person =>
        <li>
          {person.name} {person.number}
        </li>

      )
      }</div>

  )
}else{
  return(
    <div>
  {props.persons.filter(person => person.name.includes(props.filteredName)).map(person =>
        <li>
          {person.name} {person.number}
        </li>

      )}
  </div>)
}

}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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



  return (
    <div>
      <h2>Phonebook</h2>

      <h2>Filter phonebook</h2>
      <Filter persons={persons} filteredName={filteredName} setFilteredName={setFilteredName}/>

      <h2>Add new person to phonebook</h2>

      <PersonForm newName={newName} newNumber={newNumber} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber}
        setPersons={setPersons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons persons={persons} filteredName={filteredName} />
    </div>
  )
  // return (
  //   <div>
  //     <h2>Phonebook</h2>

  //     <h2>Add new person to phonebook</h2>
  //     <form onSubmit={addNumber}>
  //       <div>
  //         Name: <input value={newName}
  //           onChange={handleNameChange} />
  //       </div>
  //       <div>Number: <input value={newNumber}
  //         onChange={handleNumberChange} /></div>
  //       <div>
  //         <button type="submit">Add</button>
  //       </div>
  //     </form>
  //     <h2>Numbers</h2>
  //     {persons.map(person =>
  //       <li>
  //         {person.name} {person.number}
  //       </li>
  //     )}
  //   </div>
  // )

}

export default App
