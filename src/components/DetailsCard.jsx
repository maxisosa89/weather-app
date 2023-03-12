import React from "react";
import "./DetailsCard.css";

const DetailsCard = ({ props }) => {
  return (
    <div className={`details-container ${props.dayOrNight}`}>
      <div className="details-header">
        <h1 className="details-title">
          <b>
            {props.card?.name} - {props.card?.sys.country}
          </b>
        </h1>
      </div>
      <hr />
      <div className="details-time">
        <p>
          Fecha:{" "}
          <b>
            {props.date?.getDate().toString().padStart(2, "0")}/
            {`${(props.date?.getMonth() + 1).toString().padStart(2, "0")}`}/
            {props.date?.getFullYear()}
          </b>
        </p>
        <p>
          Hora:{" "}
          <b>
            {props.date?.getHours().toString().padStart(2, "0")}:
            {props.date?.getMinutes().toString().padStart(2, "0")}
          </b>
        </p>
        <p>
          Salida del sol:{" "}
          <b>{`${props.sunriseHour
            ?.getHours()
            .toString()
            .padStart(2, "0")}:${props.sunriseHour
            ?.getMinutes()
            .toString()
            .padStart(2, "0")}`}</b>
        </p>
        <p>
          Puesta del sol:{" "}
          <b>{`${props.sunsetHour
            ?.getHours()
            .toString()
            .padStart(2, "0")}:${props.sunsetHour
            ?.getMinutes()
            .toString()
            .padStart(2, "0")}`}</b>
        </p>
      </div>
      <div className="details-coordinates">
        <h3 className="title-section">Coordenadas</h3>
        <p>
          Latitud: <b>{props.card?.coord.lat}</b>
        </p>
        <p>
          Longitud: <b>{props.card?.coord.lon}</b>
        </p>
      </div>
      <div className="details-weather">
        <h3 className="title-section">Datos del clima</h3>
        <p>
          Temperatura: <b>{props.card?.main.temp} °C</b>
        </p>
        <p>
          Sensación térmica: <b>{props.card?.main.feels_like} °C</b>
        </p>
        <p>
          Presión atmosférica: <b>{props.card?.main.pressure} hPa</b>
        </p>
        <p>
          Humedad: <b>{props.card?.main.humidity} %</b>
        </p>
        <p>
          Mínima en la zona: <b>{props.card?.main.temp_min} °C</b>
        </p>
        <p>
          Máxima en la zona: <b>{props.card?.main.temp_max} °C</b>
        </p>
      </div>
      <div className="details-weather-status">
        <h3 className="title-section">Estado del clima</h3>
        <div className="details-weather-status-container">
          {props.card?.weather.map((w) => (
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
          Visibilidad: <b>{props.card?.visibility} mts</b>
        </p>
        <p>
          Velocidad viento: <b>{props.card?.wind.speed} mts/s</b>
        </p>
        <p>
          Dirección del viento: <b>{props.windDegrees}</b>
        </p>
      </div>
    </div>
  );
};

export default DetailsCard;
