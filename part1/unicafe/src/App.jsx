import { useState } from 'react'

const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({title,counter,children}) => <p>{title} {counter} {children}</p>

const Statistics = ({counters}) => {

  const [good,neutral,bad,total] = counters;
  const avg = (good - bad) / total;
  const pos = (good / total) * 100;

  if(total === 0) {
    return (
        <p>No feedback given</p>
    )
  } else {
    return (
        <div>
          <StatisticLine title='Good' counter={good}></StatisticLine>
          <StatisticLine title='Neutral' counter={neutral}></StatisticLine>
          <StatisticLine title='Bad' counter={bad}></StatisticLine>
          <StatisticLine title='All' counter={total}></StatisticLine>
          <StatisticLine title='Average' counter={avg}></StatisticLine>
          <StatisticLine title='Positive' counter={pos}>%</StatisticLine>
        </div>
    )
  };
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + neutral + bad;

  return (
      <div>
        <h1>Give Feedback</h1>
        <Button text='Good' onClick={() => setGood(good + 1)}></Button>
        <Button text='Neutral' onClick={() => setNeutral(neutral + 1)}></Button>
        <Button text='Bad' onClick={() => setBad(bad + 1)}></Button>
        <h1>Statistics</h1>
        <Statistics counters={[good,neutral,bad,total]}></Statistics>
      </div>
  )
};

export default App;