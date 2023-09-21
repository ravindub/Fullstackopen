import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = (props) => {
  return (
    <>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </>
  );
};

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const total = props.total;

  const average = (good - bad) / total;
  const positivie = (good / total) * 100;

  if (total === 0) {
    return (
      <div>
        <p>No feedback is given.</p>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average.toFixed(1)} />
          <StatisticLine text="Positive" value={positivie.toFixed(1) + "%"} />
        </tbody>
      </table>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const goodCount = () => {
    const count = good + 1;
    setGood(count);
    setTotal(count + neutral + bad);
  };

  const neutralCount = () => {
    const count = neutral + 1;
    setNeutral(count);
    setTotal(count + good + bad);
  };

  const badCount = () => {
    const count = bad + 1;
    setBad(count);
    setTotal(count + good + neutral);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={goodCount} text="Good" />
      <Button handleClick={neutralCount} text="Neutral" />
      <Button handleClick={badCount} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
