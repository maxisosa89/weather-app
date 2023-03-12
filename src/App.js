import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { getDataFromWeather } from "./services/ApiClients";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import NotFound from "./components/NotFound";

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
          localStorage.setItem(
            "cities",
            JSON.stringify([
              { lat: -34.6076, lon: -58.4371 },
              { lat: 19.4326, lon: -99.1332 },
              { lat: 40.7127, lon: -74.006 },
              { lat: 48.8534, lon: 2.3488 },
              { lat: 35.6828, lon: 139.7595 },
              { lat: 31.2323, lon: 121.4692 },
            ])
          );
          getLocalStorageCities();
        }
      } catch (e) {
        alert("Hubo un error con el servidor. Intente nuevamente más tarde.");
      }
    };
    getLocalStorageCities();
    const interval = setInterval(() => {
      getLocalStorageCities();
    }, 10 * 60 * 1000);
    return () => clearInterval(interval);
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
