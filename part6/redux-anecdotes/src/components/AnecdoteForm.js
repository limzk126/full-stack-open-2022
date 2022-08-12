import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const add = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdoteService.createAnecdote(
      event.target.anecdote.value
    );
    event.target.anecdote.value = '';
    dispatch(createAnecdote(newAnecdote));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
