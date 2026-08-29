import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const inputHandler = (event) => setNewName(event.target.value)

  const checkExistingName = () => {
    const checkArr = persons.filter(person => person.name === newName)
    return checkArr.length ? true : false;
  }

  const addPerson = (event) => {
    event.preventDefault()
     if(checkExistingName()) {
       window.alert(`${newName} is already added to phonebook`)
       setNewName('')
     } else {
       setPersons(persons.concat({name:newName}))
       setNewName('')
     }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form>
          <div>
            name: <input value={newName} onChange={inputHandler}/>
          </div>
          <div>
            <button type="submit" onClick={addPerson}>add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        <ul>
          {persons.map(person => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
  )
}

export default App