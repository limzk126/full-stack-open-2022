import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((persons) => {
      setPersons(persons.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        text="filter shown with"
        value={filterName}
        onChangeEventHandler={handleFilterNameChange}
      />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        nameChangeHandler={handleNameChange}
        number={newNumber}
        numberChangeHandler={handleNumberChange}
        onSubmit={addNewPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterName} />
    </div>
  );
};

const Persons = ({ persons, filterValue }) => {
  const filterPred = (person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase());

  const displayPersons = () => {
    return persons
      .filter(filterPred)
      .map((person) => <Person key={uuid()} person={person} />);
  };

  return <div>{displayPersons()}</div>;
};

const Person = ({ person }) => (
  <p>
    {person.name} {person.number}
  </p>
);

const Filter = ({ text, value, onChangeEventHandler }) => {
  return (
    <div>
      {text}: <input value={value} onChange={onChangeEventHandler} />
    </div>
  );
};

const PersonForm = (prop) => {
  return (
    <>
      <form onSubmit={prop.onSubmit}>
        <div>
          name: <input value={prop.name} onChange={prop.nameChangeHandler} />
        </div>
        <div>
          number:{" "}
          <input value={prop.number} onChange={prop.numberChangeHandler} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default App;
