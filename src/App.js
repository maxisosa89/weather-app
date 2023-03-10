import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { getDataFromWeather } from "./services/ApiClients";

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
        console.log(e);
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
      setLoading(false);
    }
  }, [cards]);
  return (
    <GlobalContext.Provider value={{ cards, setCards, loading }}>
      <Home />
    </GlobalContext.Provider>
  );
}

export default App;
