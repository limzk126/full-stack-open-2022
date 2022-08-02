import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import personService from "./services/person";

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
    const newObject = { name: newName, number: newNumber };

    const duplicate = persons.find((person) => person.name === newName);
    if (duplicate) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        console.log("the duplicate ...", duplicate);
        personService
          .updatePerson(duplicate.id, newObject)
          .then((responseObject) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? responseObject : person
              )
            );
            setNewName("");
            setNewNumber("");
          })
          .catch((err) => alert(`Failed to update ${duplicate.name}`));
      }

      return;
    }

    personService.createPerson(newObject).then((responseObject) => {
      setPersons(persons.concat(responseObject));
    });
    setNewName("");
    setNewNumber("");
  };
  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .deletePerson(personToDelete.id)
        .catch((err) => alert(`failed to delete ${personToDelete.name}.`));

      setPersons(persons.filter((person) => person.id !== personToDelete.id));
    }
  };

  useEffect(() => {
    personService
      .getAllPerson()
      .then((persons) => {
        setPersons(persons);
      })
      .catch((err) => alert("Failed to retrieve people."));
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
      <Persons
        persons={persons}
        filterValue={filterName}
        onDelete={deletePerson}
      />
    </div>
  );
};

const Persons = ({ persons, filterValue, onDelete }) => {
  const filterPred = (person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase());

  const displayPersons = () => {
    return persons
      .filter(filterPred)
      .map((person) => (
        <Person key={uuid()} person={person} onDelete={onDelete} />
      ));
  };

  return <div>{displayPersons()}</div>;
};

const Person = ({ person, onDelete }) => {
  const uniqueOnDelete = (personToDelete) => () => onDelete(personToDelete);
  return (
    <div>
      {person.name} {person.number}{" "}
      <button onClick={uniqueOnDelete(person)}>delete</button>
    </div>
  );
};

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
