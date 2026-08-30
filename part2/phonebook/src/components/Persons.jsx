import Person from "./Person.jsx";

const Persons = ({filteredPersons,deletePerson}) => {
    return(
        <ul>
            {
                filteredPersons.map(person => <Person personData={person} key={person.name} deletePerson={deletePerson}/>)
            }
        </ul>
    )
}

export default Persons