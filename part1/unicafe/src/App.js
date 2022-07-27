import { useState } from "react";

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
      <Part name="good" value={good} />
      <Part name="neutral" value={neutral} />
      <Part name="bad" value={bad} />
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
