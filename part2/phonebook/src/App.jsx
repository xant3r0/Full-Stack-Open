import { useState, useEffect } from 'react'
import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import PersonsService from "./services/Persons.js"
import Notification from "./components/Notification.jsx";

const App = () => {
  const getPersonsFromServer = () => {
      PersonsService.getAllPersons().then(data => setPersons(data))
  }
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName,setNewFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [className,setClassName] = useState(null)
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
       replaceOldNumber()
       setNewName('')
       setNewNumber('')
     } else {
       PersonsService.addPersonToDb({name:newName ,number:newNumber, id:Date.now()}).then(data => {
           setPersons(persons.concat(data))
           setMessage(`Added ${newName}`)
           setClassName('successMessageContainer')
           setTimeout(() => {
               setMessage(null)
               setClassName(null)
           },3000)
           setNewName('')
           setNewNumber('')
       })
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

  const replaceOldNumber = () => {
      if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          const person = persons.find(person => person.name === newName)
          const newPerson = {...person,number:newNumber}

          PersonsService.replaceOldNumber(person.id,newPerson)
              .then(data => {
                  setPersons(persons.map(person => {
                      return person.id === data.id ? newPerson : person
                  }))
                  setMessage(`Changed ${newName}`)
                  setClassName('successMessageContainer')
                  setTimeout(() => {
                      setMessage(null)
                      setClassName(null)
                  },3000)
              })
              .catch(e => {
                setMessage(`Information of ${newName} has been already been removed from server`)
                setClassName('errorMessageContainer')
                setTimeout(() => {
                    setMessage(null)
                    setClassName(null)
              },3000)
          })
      }
  }

  useEffect(getPersonsFromServer, []);

  return (
      <div>
        <Notification message={message} className={className}></Notification>
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