import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchInputHandler = (event) => setSearchInput(event.target.value);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((countries) => {
      console.log(countries.data);
      setCountries(countries.data);
    });
  }, []);

  return (
    <div>
      <div>
        find countries
        <input value={searchInput} onChange={searchInputHandler} />
      </div>
      <div>
        <Countries countries={countries} searchInput={searchInput} />
      </div>
    </div>
  );
}

const Countries = ({ countries, searchInput }) => {
  const filterPred = (country) => {
    let matchCommon = country.name.common
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    let matchOfficial = country.name.official
      .toLowerCase()
      .includes(searchInput.toLowerCase());

    return matchCommon || matchOfficial;
  };
  const filteredCountries = countries.filter(filterPred);

  console.log("filtered countries...", filteredCountries);
  if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    );
  }
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <p key={uuid()}>{country.name.official}</p>
      ))}
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>languages:</h3>
      <div>
        {Object.keys(country.languages).map((key) => (
          <ul key={uuid()}>{country.languages[key]}</ul>
        ))}
      </div>
      <img src={country.flags.png} alt="" />
    </div>
  );
};
export default App;
