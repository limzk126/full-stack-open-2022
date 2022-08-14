import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(
      setNotification({
        content: `you voted '${
          anecdote.content
        }'`,
        warning: false,
      }, 5)
    );
  };
  console.log('asdasdasd', anecdotes);
  return (
    <div>
      {anecdotes
        .filter((a) => {
          console.log(a);
          return a.content.toLowerCase().includes(filter.toLowerCase());
        })
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
