const Total = ({parts}) => {
    return (
        <p><strong>Total of {parts.reduce((acc,curr) => acc + curr.exercises,0)} exercises</strong></p>
    )
}

export default Total;