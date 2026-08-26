const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
      <div>
        <Header name={course}></Header>
        <Content parts={[part1,part2,part3]} ex={[exercises1,exercises2,exercises3]}></Content>
        <Total ex={[exercises1,exercises2,exercises3]}></Total>
      </div>
  )
};

const Header = (props) => {
  return (
      <>
        <h1>{props.name}</h1>
      </>
  )
};

const Content = (props) => {
  return (
      <>
          <Part part={props.parts[0]} ex={props.ex[0]} />
          <Part part={props.parts[1]} ex={props.ex[1]} />
          <Part part={props.parts[2]} ex={props.ex[2]} />
      </>
  )
};

const Total = (props) => {
  return (
      <>
        <p>Number of exercises {props.ex[0] + props.ex[1] + props.ex[2]}</p>
      </>
  )
};

const Part = (props) => {
    return (
        <>
            <p>
                {props.part} {props.ex}
            </p>
        </>
    )
}

export default App
