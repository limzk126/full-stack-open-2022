import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const searchInputHandler = (event) => {
    setSearchInput(event.target.value);
    setSelectedCountry(null);
  };

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
        <Countries
          countries={countries}
          searchInput={searchInput}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
      </div>
    </div>
  );
}

const Countries = ({
  countries,
  searchInput,
  selectedCountry,
  setSelectedCountry,
}) => {
  if (selectedCountry !== null) {
    const tmp = selectedCountry;
    return (
      <div>
        <CountryInfo country={tmp} />
      </div>
    );
  }

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

  if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryInfo country={filteredCountries[0]} />
      </div>
    );
  }
  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <div>
      {filteredCountries.map((country) => (
        <Country
          key={uuid()}
          country={country}
          setSelectedCountry={setSelectedCountry}
        />
      ))}
    </div>
  );
};

const Country = ({ country, setSelectedCountry }) => {
  return (
    <div>
      {country.name.official}{" "}
      <button onClick={() => setSelectedCountry(country)}>show</button>
    </div>
  );
};

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h3>languages:</h3>
      <div>
        <ul>
          {Object.keys(country.languages).map((key) => (
            <li key={uuid()}>{country.languages[key]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt="" />
    </div>
  );
};

export default App;
