import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const displayErrorMessage = (errMsg) => {
    setErrorMessage(errMsg);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

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
        personService
          .updatePerson(duplicate.id, newObject)
          .then((responseObject) => {
            setPersons(
              persons.map((person) =>
                person.name === newName ? responseObject : person
              )
            );
            displayMessage(`Updated ${duplicate.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((err) => {
            displayErrorMessage(err.response.data.error);
          });
      }

      return;
    }

    personService
      .createPerson(newObject)
      .then((responseObject) => {
        setPersons(persons.concat(responseObject));
        displayMessage(`Added ${responseObject.name}`);
      })
      .catch((err) => {
        displayErrorMessage(err.response.data.error);
      });
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService
        .deletePerson(personToDelete.id)
        .then((responseObject) => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete.id)
          );
          displayMessage(`Deleted ${personToDelete.name}`);
        })
        .catch((err) => alert(`failed to delete ${personToDelete.name}.`));
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
      <Notification message={message} />
      <ErrorNotification message={errorMessage} />
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

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const NotificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={NotificationStyle}>{message}</div>;
};

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const NotificationStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={NotificationStyle}>{message}</div>;
};

const Persons = ({ persons, filterValue, onDelete }) => {
  console.log("persons called.......");
  const filterPred = (person) => {
    console.log("da person.....", person);
    return person.name.toLowerCase().includes(filterValue.toLowerCase());
  };

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
