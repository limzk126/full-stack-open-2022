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
    return (
      <div>
        <CountryInfo country={selectedCountry} />
      </div>
    );
  }

  const filterPred = (country) => {
    const matchCommon = country.name.common
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchOfficial = country.name.official
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
      {filteredCountries.map((country) => {
        return (
          <Country
            key={uuid()}
            country={country}
            setSelectedCountry={setSelectedCountry}
          />
        );
      })}
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
  const [weather, setWeather] = useState(null);

  const effect = () => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const apiKey = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      .then((data) => {
        console.log("weather ...........", data);
        setWeather(data);
      });
  };

  useEffect(effect, [country]);

  return (
    <div>
      <h1>{country.name.official}</h1>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h3>languages:</h3>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt="" />
      <Weather capital={country.capital[0]} weather={weather} />
    </div>
  );
};

const Weather = ({ capital, weather }) => {
  if (!weather) return;

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>temperature {weather.data.main.temp} Celcius</div>
      <img
        src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
        alt=""
      />
      <div>wind {weather.data.wind.speed} m/s</div>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <ul>
        {Object.keys(languages).map((key) => (
          <li key={uuid()}>{languages[key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
