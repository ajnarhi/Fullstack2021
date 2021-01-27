import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    if (persons.some(p => p.name===newName) ){
      alert(newName+' is already added to phonebook')
      setNewName('')
    } else {

      const personObject = {
        name: newName
      }

      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          Name: <input value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <li>
          {person.name}
        </li>
      )}
    </div>
  )

}

export default App
