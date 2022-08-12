const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = initialState, action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'ADD_ANECDOTE':
      return state.concat(action.data);
    case 'INCREMENT_VOTE':
      const id = action.data.id;
      const anecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1,
      };
      const updatedState = state.map((a) =>
        a.id === id ? changedAnecdote : a
      );
      return updatedState.sort((a, b) => b.votes - a.votes);
    default:
  }

  return state;
};

export const incrementVoteOf = (id) => {
  return {
    type: 'INCREMENT_VOTE',
    data: { id },
  };
};

export const addNewAnecdote = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0,
    },
  };
};

export default reducer;