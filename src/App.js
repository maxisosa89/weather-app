import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { getDataFromWeather } from "./services/ApiClients";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";

function App() {
  const [cards, setCards] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocalStorageCities = async () => {
      try {
        const infoLocal = JSON.parse(localStorage.getItem("cities"));
        if (infoLocal) {
          const cities = infoLocal?.map((e) => {
            return getDataFromWeather(e.lat, e.lon);
          });
          const results = await Promise.all(cities);
          setCards(results);
        } else {
          setCards([]);
        }
      } catch (e) {
        alert("Hubo un error con el servidor. Intente nuevamente más tarde.");
      }
    };
    getLocalStorageCities();
  }, []);
  useEffect(() => {
    if (cards) {
      const cities = cards?.map((card) => {
        return { lat: card.coord.lat, lon: card.coord.lon };
      });
      localStorage.setItem("cities", JSON.stringify(cities));
      loading && setLoading(false);
    }
    // eslint-disable-next-line
  }, [cards]);
  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ cards, setCards, loading }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
