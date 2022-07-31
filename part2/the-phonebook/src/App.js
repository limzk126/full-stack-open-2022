import "./App.css";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value);
  };

  const addNewPerson = (event) => {
    event.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook!`);
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={filterName} onChange={handleFilterNameChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons
          .filter((person) =>
            person.name.toLowerCase().includes(filterName.toLowerCase())
          )
          .map((person) => (
            <p key={uuid()}>
              {person.name} {person.number}
            </p>
          ))}
      </div>
    </div>
  );
};

export default App;
