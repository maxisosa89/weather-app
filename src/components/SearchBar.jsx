import React, { useState, useContext, useRef, useEffect } from "react";
import { getDataFromCities, getDataFromWeather } from "../services/ApiClients";
import GlobalContext from "../context/GlobalContext";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { cards, setCards } = useContext(GlobalContext);
  const divRef = useRef(null);

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
    try {
      const result = await getDataFromCities(searchTerm);
      setResults(result);
      document.getElementById("results-list-container").classList.add("active");
    } catch (e) {
      console.log(e);
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      const result = await getDataFromWeather(lat, lon);
      const alreadyExists = cards.some((card) => {
        return (
          card.coord.lat === result.coord.lat &&
          card.coord.lon === result.coord.lon
        );
      });
      !alreadyExists && setCards([...cards, result]);
      document
        .getElementById("results-list-container")
        .classList.remove("active");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        document
          .getElementById("results-list-container")
          .classList.remove("active");
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divRef]);

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
      <div
        id="results-list-container"
        ref={divRef}
        className="results-list-container"
      >
        <ul>
          {results?.length > 0 ? (
            results?.map((e, i) => (
              <li
                key={`${e.name}-${e.country}-${e.lat}-${e.lon}-${i}`}
                className="result-list-item"
                onClick={() => getWeather(e.lat, e.lon)}
              >
                {e.name} - {e.country}
              </li>
            ))
          ) : (
            <li className="result-list-item">No se hallaron resultados.</li>
          )}
        </ul>
      </div>
    </form>
  );
}

export default SearchBar;
