const App = () => {
  const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14
    };

  return (
      <>
        <Header name={course}></Header>
        <Content parts={[part1,part2,part3]}></Content>
        <Total parts={[part1,part2,part3]}></Total>
      </>
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
    //console.log(props.parts);
  return (
      <>
          <Part part={props.parts[0].name} ex={props.parts[0].exercises} />
          <Part part={props.parts[1].name} ex={props.parts[1].exercises} />
          <Part part={props.parts[2].name} ex={props.parts[2].exercises} />
      </>
  )
};

const Total = (props) => {
  return (
      <>
        <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
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
