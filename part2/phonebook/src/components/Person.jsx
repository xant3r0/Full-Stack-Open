const Person = ({personData}) => {
    const {name,number} = personData
    return (
        <li>{name} {number}</li>
    )
}

export default Person