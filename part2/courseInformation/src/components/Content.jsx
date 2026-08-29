import Part from './Part.jsx'
import Total from "./Total.jsx";

const Content = ({content}) => {
    return (
        <>
            <div>
                {content.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}></Part>)}
            </div>
            <Total parts={content}></Total>
        </>
    )
}

export default Content