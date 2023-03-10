import React, { useContext } from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import GlobalContext from "../context/GlobalContext";
import "./Home.css";

const Home = () => {
  const { cards, /* setCards */ } = useContext(GlobalContext);
  return (
    <>
      <div className="container-searchbar">
        <SearchBar />
      </div>
      <div className="container-card">
        {cards?.map((e) => (
          <div key={e.id} className="container-card">
            <Card {...e} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
