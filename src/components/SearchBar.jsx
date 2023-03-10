import React, { useState, useContext } from "react";
import { getDataFromCities, getDataFromWeather } from "../services/ApiClients";
import GlobalContext from "../context/GlobalContext";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { cards, setCards } = useContext(GlobalContext);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    document
      .getElementById("results-list-container")
      .classList.remove("active");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    getCities();
  };

  const getCities = async () => {
    const result = await getDataFromCities(searchTerm);
    setResults(result);
    console.log(result);
    result.length > 0
      ? document
          .getElementById("results-list-container")
          .classList.add("active")
      : document
          .getElementById("results-list-container")
          .classList.remove("active");
  };

  const getWeather = async (lat, lon) => {
    const result = await getDataFromWeather(lat, lon);
    setCards([...cards, result]);
  };

  return (
    <form onSubmit={handleFormSubmit} className="form-search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <button className="search-bar-button" type="submit">
        Buscar
      </button>
      <div id="results-list-container" className="results-list-container">
        <ul>
          {results?.map((e, i) => (
            <li
              key={`${e.name}-${e.country}-${e.lat}-${e.lon}-${i}`}
              className="result-list-item"
              onClick={() => getWeather(e.lat, e.lon)}
            >
              {e.name} - {e.country}
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default SearchBar;
