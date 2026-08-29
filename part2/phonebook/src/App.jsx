import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const inputHandler = (event) => setNewName(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    setPersons(persons.concat({name:newName}))
    setNewName('')
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