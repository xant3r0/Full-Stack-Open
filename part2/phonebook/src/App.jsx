import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
       setPersons(persons.concat({name:newName,number:newNumber}))
       setNewName('')
       setNewNumber('')
     }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>name: <input value={newName} onChange={nameHandler}/></div>
          <div>number: <input value={newNumber} onChange={numberHandler}/></div>
          <div><button type="submit" onClick={addPerson}>add</button></div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
  )
}

export default App