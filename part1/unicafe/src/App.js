import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (!(good || neutral || bad)) return (<>No feedback given</>)

  const all = good + neutral + bad;
  const average = good - bad === 0 ? 0 : (good - bad) / all;
  const positive = good === 0 ? 0 : (good / all) * 100;
  return (
    <>
      <Part name="good" value={good} />
      <Part name="neutral" value={neutral} />
      <Part name="bad" value={bad} />
      <Part name="all" value={all} />
      <Part name="average" value={average} />
      <Part name="positive" value={`${positive} %`} />
    </>
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

const Part = (prop) => {
  return (
    <>
      <p>
        {prop.name} {prop.value}
      </p>
    </>
  );
};

export default App;
