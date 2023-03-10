import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([]);
  return (
    <GlobalContext.Provider value={{ cards, setCards }}>
      <Home />
    </GlobalContext.Provider>
  );
}

export default App;
