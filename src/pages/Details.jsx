import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import Spinner from "../components/Spinner";
import "./Details.css";

const Details = () => {
  const { id } = useParams();
  const { cards } = useContext(GlobalContext);
  const [card, setCard] = useState();
  const [date, setDate] = useState();
  const [sunriseHour, setSunriseHour] = useState();
  const [sunsetHour, setSunsetHour] = useState();
  const [windDegrees, setWindDegrees] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterCard = cards && cards.filter((c) => c.id === parseInt(id));
    filterCard && setCard(filterCard[0]);
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
      setLoading(false);
    }    
  }, [card]);
  return (
    <div className="global-details-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="details-container">
          <div className="details-header">
            <h1 className="details-title">
              <b>
                {card?.name} - {card?.sys.country}
              </b>
            </h1>
          </div>
          <hr />
          <div className="details-time">
            <p>
              Fecha:{" "}
              <b>
                {date?.getDate().toString().padStart(2, "0")}/
                {`${(date?.getMonth() + 1).toString().padStart(2, "0")}`}/
                {date?.getFullYear()}
              </b>
            </p>
            <p>
              Hora:{" "}
              <b>
                {date?.getHours().toString().padStart(2, "0")}:
                {date?.getMinutes().toString().padStart(2, "0")}
              </b>
            </p>
            <p>
              Salida del sol:{" "}
              <b>{`${sunriseHour
                ?.getHours()
                .toString()
                .padStart(2, "0")}:${sunriseHour
                ?.getMinutes()
                .toString()
                .padStart(2, "0")}`}</b>
            </p>
            <p>
              Puesta del sol:{" "}
              <b>{`${sunsetHour
                ?.getHours()
                .toString()
                .padStart(2, "0")}:${sunsetHour
                ?.getMinutes()
                .toString()
                .padStart(2, "0")}`}</b>
            </p>
          </div>
          <div className="details-coordinates">
            <h3 className="title-section">Coordenadas</h3>
            <p>
              Latitud: <b>{card?.coord.lat}</b>
            </p>
            <p>
              Longitud: <b>{card?.coord.lon}</b>
            </p>
          </div>
          <div className="details-weather">
            <h3 className="title-section">Datos del clima</h3>
            <p>
              Temperatura: <b>{card?.main.temp} °C</b>
            </p>
            <p>
              Sensación térmica: <b>{card?.main.feels_like} °C</b>
            </p>
            <p>
              Presión atmosférica: <b>{card?.main.pressure} hPa</b>
            </p>
            <p>
              Humedad: <b>{card?.main.humidity} %</b>
            </p>
            <p>
              Mínima en la zona: <b>{card?.main.temp_min} °C</b>
            </p>
            <p>
              Máxima en la zona: <b>{card?.main.temp_max} °C</b>
            </p>
          </div>
          <div className="details-weather-status">
            <h3 className="title-section">Estado del clima</h3>
            <div className="details-weather-status-container">
              {card?.weather.map((w) => (
                <div key={w.id} className="details-weather-status-item">
                  <img
                    className="details-weather-status-icon"
                    src={`https://openweathermap.org/img/wn/${w.icon}.png`}
                    alt="wether-img"
                    width="80px"
                    height="80px"
                  />
                  <p>
                    <b>{w.description.toUpperCase()}</b>
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="details-visibility-wind">
            <h3 className="title-section">Visibilidad y viento</h3>
            <p>
              Visibilidad: <b>{card?.visibility} mts</b>
            </p>
            <p>
              Velocidad viento: <b>{card?.wind.speed} mts/s</b>
            </p>
            <p>
              Dirección del viento: <b>{windDegrees}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
