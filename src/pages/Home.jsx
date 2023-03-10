import React, { useContext } from "react";
import Card from "../components/Card";
import GlobalContext from "../context/GlobalContext";
import "./Home.css";

const Home = () => {
  const { cards, setCards } = useContext(GlobalContext);
  console.log(cards[0]);
  return (
    <>
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
