import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if(persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }

    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((person) => (
          <p key={uuid()}>{person.name}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
