import React, { useState, useEffect } from 'react'
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
    //props.persons.some(p => p.name === props.newName some kertoo, että löytyykö vai eikö löydy (true, false)
    const existingPerson = props.persons.filter(p => p.name === props.newName) //filter tekee listan löytyneistä/löytyneestä
    if (existingPerson.length > 0) {
      if(window.confirm(props.newName + ' is already added to phonebook. Do you want to replace their old number with the new number?')){
      personService
        .replaceOldNumber(existingPerson[0].id, props.newName, props.newNumber)
        .then(response => {
          props.setNewName('')
          props.setNewNumber('')
          props.setPersons(props.persons.filter(n => n.id !== response.data.id).concat(response.data))
        }).then(() => {
          props.setNotificationMessage(
            `Person with name '${props.newName}' has now a new phonenumber`
          )
          setTimeout(() => {
            props.setNotificationMessage(null)
          }, 5000)
        }).catch(error => {
          console.log('fail')
          props.setNotificationMessage(
            `Person with name '${props.newName} ' has already been removed from server`
          )
        })}
    } else {

      const personObject = {
        name: props.newName,
        number: props.newNumber
      }

      personService.create(personObject)
        .then(response => {
          console.log(response)
          props.setPersons(props.persons.concat(response.data))
          props.setNewName('')
          props.setNewNumber('')
        })
        .then(() => {
          props.setNotificationMessage(
            `Person with name '${personObject.name}' has been added to phonebook`
          )
          setTimeout(() => {
            props.setNotificationMessage(null)
          }, 5000)


        }).catch(error => {
          // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
          console.log(error.response.data)
          props.setNotificationMessage(
            error.response.data
          )
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
          ).then(() => {
            props.setNotificationMessage(
              `Person with name '${name}' has been deleted from phonebook`
            )
            setTimeout(() => {
              props.setNotificationMessage(null)
            }, 5000)
  
  
          })



      }
    }

    const DeleteButton = (props) => {
      return (

        <button onClick={() => deleteThisPerson(props.person.id, props.person.name)}>Delete</button>
      )
    }

    if (props.filteredName === '') {
      return (
        <div>
          {props.persons.map(person =>
            <li key={person.name}>
              {person.name} {person.number}  { }

              <DeleteButton person={person} />
            </li>
          )
          }</div>

      )
    } else {
      return (
        <div>
          {props.persons.filter(person => person.name.includes(props.filteredName)).map(person =>
            <li key={person.name}>
              {person.name} {person.number} { }

              <button onClick={() => deleteThisPerson(person.id, person.name)}>Delete</button>
            </li>

          )}
        </div>)
    }

  }



  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="message">
        {message}
      </div>
    )
  }


  const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filteredName, setFilteredName] = useState('')
    const [notificationMessage, setNotificationMessage] = useState(null)

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
        <Filter persons={persons} filteredName={filteredName} setFilteredName={setFilteredName} />

        <h2>Add new person to phonebook</h2>
        <Notification message={notificationMessage} />
        <PersonForm newName={newName} newNumber={newNumber} persons={persons} setNewName={setNewName} setNewNumber={setNewNumber}
          setPersons={setPersons} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} setNotificationMessage={setNotificationMessage} />

        <h3>Numbers</h3>

        <Persons persons={persons} filteredName={filteredName} setPersons={setPersons} setNotificationMessage={setNotificationMessage} />
      </div>
    )


  }

  export default App
