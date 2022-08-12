import { useSelector, useDispatch } from 'react-redux';
import { incrementVoteOf } from '../reducers/anecdoteReducer';
import {
  setNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const { anecdotes, filter } = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);

    dispatch(incrementVoteOf(id));
    dispatch(
      setNotification({
        content: `you voted '${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }'`,
        warning: false,
      })
    );
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
