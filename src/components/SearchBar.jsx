import React, { useState, useContext, useRef, useEffect } from "react";
import { getDataFromCities, getDataFromWeather } from "../services/ApiClients";
import GlobalContext from "../context/GlobalContext";
import Spinner from "./Spinner";
import ErrorModal from "./ErrorModal";
import "./SearchBar.css";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ error: false, msg: "" });
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
    setLoading(true);
    if (searchTerm.trim() !== "") {
      getCities();
    } else {
      setError({ error: true, msg: "Ingrese el nombre de una ciudad." });
    }
    setSearchTerm(searchTerm.trim());
    setLoading(false);
  };

  const getCities = async () => {
    const btnSearch = document.getElementById("btn-search");
    const resultsListContainer = document.getElementById(
      "results-list-container"
    );

    btnSearch.disabled = true;
    try {
      const result = await getDataFromCities(searchTerm.trim());
      setResults(result);
      resultsListContainer.classList.add("active");
    } catch (error) {
      setError({
        error: true,
        msg: "Hubo un error con el servidor. Intente nuevamente más tarde.",
      });
    } finally {
      btnSearch.disabled = false;
    }
  };

  const getWeather = async (lat, lon) => {
    try {
      if (cards.length < 10){
      const result = await getDataFromWeather(lat, lon);
      const alreadyExists = cards.some((card) => {
        return (
          card.coord.lat === result.coord.lat &&
          card.coord.lon === result.coord.lon
        );
      });
      if (!alreadyExists) {
        setCards([...cards, result]);
      } else {
        setError({
          error: true,
          msg: "Esta ciudad ya se encuentra en el tablero.",
        });
      }
      document
        .getElementById("results-list-container")
        .classList.remove("active");
      } else {
        setError({
          error: true,
          msg: "Se admite un máximo de 10 ciudades. Elimine una para agregar otra.",
        });
      }
    } catch (e) {
      setError({
        error: true,
        msg: "Hubo un error con el servidor. Intente nuevamente más tarde.",
      });
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

      <button id="btn-search" className="search-bar-button" type="submit">
        {loading ? <Spinner /> : "Buscar"}
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
            <li className="result-list-item-empty">No se hallaron resultados.</li>
          )}
        </ul>
      </div>
      {error.error && (
        <ErrorModal
          errorMessage={error.msg}
          onClose={() => setError({ error: false, msg: "" })}
        />
      )}
    </form>
  );
}

export default SearchBar;
