import Person from "./Person.jsx";

const Persons = ({filteredPersons}) => {
    return(
        <ul>
            {
                filteredPersons.map(person => <Person personData={person} key={person.name}/>)
            }
        </ul>
    )
}

export default Persons