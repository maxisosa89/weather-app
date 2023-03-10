import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Spinner from "../components/Spinner";
import ErrorModal from "../components/ErrorModal";
import "./Details.css";
import DetailsCard from "../components/DetailsCard";
import Map from "../components/Map";

const Details = () => {
  const { id } = useParams();
  const { cards } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [card, setCard] = useState();
  const [date, setDate] = useState();
  const [sunriseHour, setSunriseHour] = useState();
  const [sunsetHour, setSunsetHour] = useState();
  const [windDegrees, setWindDegrees] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: false, msg: "" });
  const [dayOrNight, setDayOrNight] = useState("d");

  const onClose = () => {
    setError({ error: false, msg: "" });
    navigate("/");
  };

  useEffect(() => {
    if (cards) {
      const filterCard = cards && cards.filter((c) => c.id === parseInt(id));
      filterCard.length
        ? setCard(filterCard[0])
        : setError({
            error: true,
            msg: "No se encontrĂ³ la ciudad que buscas.",
          });
    }
  }, [cards, id]);
  useEffect(() => {
    if (card) {
      setDate(
        new Date(
          new Date(
            new Date().toLocaleString("en-US", { timeZone: "UTC" })
          ).getTime() +
            card.timezone * 1000
        )
      );
      setSunriseHour(new Date(card.sys.sunrise * 1000));
      setSunsetHour(new Date(card.sys.sunset * 1000));
      const degrees = [
        "Norte",
        "Noreste",
        "Este",
        "Sureste",
        "Sur",
        "Suroeste",
        "Oeste",
        "Noroeste",
      ];
      const index = Math.floor(((card.wind.deg + 22.5) % 360) / 45);
      setWindDegrees(degrees[index]);
      setDayOrNight(card.weather[0].icon.slice(-1));
      setLoading(false);
    }
  }, [card]);
  return (
    <div className="global-details-container">
      <div className="nav-details">
        <Link to="/">
          <button className="btn-back">
            <span className="arrow-left"></span>
          </button>
        </Link>
      </div>
      {loading ? (
        <div style={{ marginTop: "20px" }}>
          <Spinner />
        </div>
      ) : (
        <div className="detail-map-container">
          <DetailsCard
            props={{
              card,
              date,
              sunriseHour,
              sunsetHour,
              windDegrees,
              dayOrNight,
            }}
          />
          <Map
            lat={parseFloat(card?.coord.lat)}
            lng={parseFloat(card?.coord.lon)}
          />
        </div>
      )}
      {error.error && (
        <ErrorModal errorMessage={error.msg} onClose={() => onClose()} />
      )}
    </div>
  );
};

export default Details;
