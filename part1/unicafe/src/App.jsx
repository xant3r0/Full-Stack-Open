import { useState } from 'react'

const Button = ({text,onClick}) => <button onClick={onClick}>{text}</button>

const StatisticDisplay = ({title,counter,children}) => <p>{title} {counter} {children}</p>

const Statistics = ({counters}) => {

  const [good,neutral,bad,total] = counters;
  const avg = (good - bad) / total;
  const pos = (good / total) * 100;

  return (
      <div>
        <StatisticDisplay title={'Good'} counter={good}></StatisticDisplay>
        <StatisticDisplay title={'Neutral'} counter={neutral}></StatisticDisplay>
        <StatisticDisplay title={'Bad'} counter={bad}></StatisticDisplay>
        <StatisticDisplay title={'All'} counter={total}></StatisticDisplay>
        <StatisticDisplay title={'Average'} counter={avg}></StatisticDisplay>
        <StatisticDisplay title={'Positive'} counter={pos}>%</StatisticDisplay>
      </div>
  )
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
        <Button text={'Good'} onClick={() => setGood(good + 1)}></Button>
        <Button text={'Neutral'} onClick={() => setNeutral(neutral + 1)}></Button>
        <Button text={'Bad'} onClick={() => setBad(bad + 1)}></Button>
        <h1>Statistics</h1>
        <Statistics counters={[good,neutral,bad,total]}></Statistics>
      </div>
  )
};

export default App;