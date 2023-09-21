import { useState } from "react";

const MostVotes = (props) => {
  const anecdotes = props.anecdotes;
  const votes = props.votes;
  const max = Math.max(...votes);

  if (max === 0) {
    return <p>No votes.</p>;
  } else {
    return (
      <>
        <p>{anecdotes[votes.indexOf(max)]}</p>
        <p>has {max} Votes.</p>
      </>
    );
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const emptyVotes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(emptyVotes);

  const nextAnecdote = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };

  const addVote = () => {
    const voteCopy = [...votes];
    voteCopy[selected] += 1;
    setVotes(voteCopy);
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} Votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
