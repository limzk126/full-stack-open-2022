import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const updatedState = state.map((a) =>
        a.id === updatedAnecdote.id ? updatedAnecdote : a
      );
      return updatedState.sort((a, b) => b.votes - a.votes);
    },
    setAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const addAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch(createAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    const updatedAnecdote = await anecdoteService.updateAnecdote(votedAnecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  }
};

export const { createAnecdote, updateAnecdote, setAnecdotes} =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
