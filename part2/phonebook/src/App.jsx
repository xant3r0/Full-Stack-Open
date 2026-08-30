import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import PersonsService from "./services/Persons.js"

const App = () => {
  const getPersonsFromServer = () => {
      PersonsService.getAllPersons().then(data => setPersons(data))
  }
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName,setNewFilter] = useState('')
  const filterHandler = (event) => setNewFilter(event.target.value)
  const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().startsWith(filterName.toLowerCase())
  )
  const nameHandler = (event) => setNewName(event.target.value)
  const numberHandler = (event) => setNewNumber(event.target.value)

  const checkExistingName = () => {
    const checkArr = persons.filter(person => person.name === newName)
    return checkArr.length ? true : false;
  }

  const addPerson = (event) => {
    event.preventDefault()
     if(checkExistingName()) {
       window.alert(`${newName} is already added to phonebook`)
       setNewName('')
       setNewNumber('')
     } else {
       PersonsService.addPersonToDb({name:newName ,number:newNumber, id:Date.now()}).then(data => setPersons(persons.concat(data)))
       setNewName('')
       setNewNumber('')
     }
  }

  const deletePerson = (userId,personName) => {
      if(window.confirm(`Delete ${personName} ?`)) {
          PersonsService.deleteUserFromDb(userId)
              .then(
                  data => setPersons(persons.filter(person => person.id !== data.id))
              )
      }
  }

  useEffect(getPersonsFromServer, []);

  return (
      <div>
        <h2>Phonebook</h2>
        <Filter filterName={filterName} filterHandler={filterHandler}></Filter>
        <h2>Add a new</h2>
        <PersonForm valuesAndHandlers={[newName,nameHandler,newNumber,numberHandler,addPerson]}></PersonForm>
        <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}></Persons>
      </div>
  )
}

export default App