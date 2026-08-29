import Part from './Part.jsx'

const Content = ({content}) => {
    return (
        <div>
            {content.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}></Part>)}
        </div>
    )
}

export default Content