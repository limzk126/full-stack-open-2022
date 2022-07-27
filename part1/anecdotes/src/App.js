import "./App.css";
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const selectNext = () => {
    let nextIdx = Math.floor(anecdotes.length * Math.random());
    setSelected(nextIdx);
  };

  const incrementVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  };

  const maxIdx = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Header text="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>{`has ${votes[selected]} votes`}</div>
      <div>
        <button onClick={incrementVote}>vote</button>
        <button onClick={selectNext}>next anecdote</button>
      </div>
      <Header text="Anecdote with most votes" />
      <div>{anecdotes[maxIdx]}</div>
    </div>
  );
};

const Header = ({ text }) => (
  <>
    <h1>{text}</h1>
  </>
);

export default App;
