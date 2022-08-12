import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/filter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnecdoteForm />
      <Filter />
      <AnecdoteList />
    </div>
  );
};

export default App;
