const PersonForm = ({valuesAndHandlers}) => {
    const [newName,nameHandler,newNumber,numberHandler,addPerson] = valuesAndHandlers
    return (
        <form>
            <div>name: <input value={newName} onChange={nameHandler}/></div>
            <div>number: <input value={newNumber} onChange={numberHandler}/></div>
            <div><button type="submit" onClick={addPerson}>add</button></div>
        </form>
    )
}

export default PersonForm