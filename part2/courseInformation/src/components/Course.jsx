import Header from './Header.jsx'
import Content from './Content.jsx'

const Course = ({course}) => {
    // console.log(course)
    return(
        <>
            <Header text={course.name}></Header>
            <Content content={course.parts}></Content>
        </>
    )
}

export default Course