import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) return <>No feedback given</>;

  const all = good + neutral + bad;
  const average = good - bad === 0 ? 0 : (good - bad) / all;
  const positive = good === 0 ? 0 : (good / all) * 100;

  return (
    <table>
      <tbody>
        <StatisticLine name="good" value={good} />
        <StatisticLine name="neutral" value={neutral} />
        <StatisticLine name="bad" value={bad} />
        <StatisticLine name="all" value={all} />
        <StatisticLine name="average" value={average} />
        <StatisticLine name="positive" value={`${positive} %`} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increment = (state, increase) => () => increase(state + 1);

  return (
    <div>
      <Header title="give feedback" />
      <Button content="good" onClick={increment(good, setGood)} />
      <Button content="neutral" onClick={increment(neutral, setNeutral)} />
      <Button content="bad" onClick={increment(bad, setBad)} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

const Header = (prop) => (
  <>
    <h1>{prop.title}</h1>
  </>
);

const Button = ({ content, onClick }) => (
  <>
    <button onClick={onClick}>{content}</button>
  </>
);

const StatisticLine = ({ name, value }) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </>
  );
};

export default App;
