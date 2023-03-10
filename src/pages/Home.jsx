import React, { useContext } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import GlobalContext from "../context/GlobalContext";
import "./Home.css";

const Home = () => {
  const { cards, setCards } = useContext(GlobalContext);
  const deleteCard = (e) => {
    setCards(cards.filter((c) => c.id !== parseInt(e.target.id)));
  };
  return (
    <>
      <div className="container-searchbar">
        <SearchBar />
      </div>
      <div className="container-card">
        {cards.length ? (
          cards?.map((e, i) => (
            <div key={`${e.id}-${i}`} className="container-card">
              <button
                className="btn-delete-card"
                id={e.id}
                onClick={deleteCard}
              >
                X
              </button>
              <Card {...e} />
            </div>
          ))
        ) : (
          <h3>No haz seleccionado ninguna ciudad.</h3>
        )}
      </div>
    </>
  );
};

export default Home;
