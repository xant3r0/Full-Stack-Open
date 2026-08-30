const Person = ({personData,deletePerson}) => {
    const {name,number,id} = personData
    return (
        <li>{name} {number} <button onClick={() =>  deletePerson(id,name)}>Delete</button></li>
    )
}

export default Person