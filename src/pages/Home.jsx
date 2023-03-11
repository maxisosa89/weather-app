import React, { useContext } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Spinner from "../components/Spinner";
import GlobalContext from "../context/GlobalContext";
import "./Home.css";

const Home = () => {
  const { cards, setCards, loading } = useContext(GlobalContext);
  const deleteCard = (e) => {
    setCards(cards.filter((c) => c.id !== parseInt(e.target.id)));
  };
  return (
    <>
      <div className="container-searchbar">
        <SearchBar />
      </div>
      <div className="container-cards">
        {loading ? (
          <Spinner />
        ) : cards.length ? (
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
          <h3 className="empty-msg">No haz seleccionado ninguna ciudad.</h3>
        )}
      </div>
    </>
  );
};

export default Home;
