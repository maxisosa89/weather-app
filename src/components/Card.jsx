import React from "react";
import "./Card.css"; // importar archivo CSS para estilos personalizados

const Card = (props) => {
  const date = new Date(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "UTC" })
    ).getTime() +
      props.timezone * 1000
  );
  return (
    <div className="card-container">
      <h1 className="card-title">
        {props.name} - {props.sys.country}
      </h1>
      <div className="card-content">
        <div className="card-date-container">
          <p className="card-date">
            {date.getDay().toString().padStart(2, "0")}/
            {date.getMonth().toString().padStart(2, "0")}/{date.getFullYear()} -{" "}
            {date.getHours().toString().padStart(2, "0")}:
            {date.getMinutes().toString().padStart(2, "0")}
          </p>
        </div>
        <div className="card-temperature-container">
          <p className="card-temperature">{props.main.temp.toFixed()}°C</p>
          <div className="card-weather-container">
            <img
              className="card-weather-icon"
              src={`https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`}
              alt="ClimaImg"
              width="80px"
              height="80px"
            />
            <p className="card-weather-description">
              {props.weather[0].description}
            </p>
          </div>
        </div>
      </div>
      <p className="card-temperature-range">
        Min: {props.main.temp_min}°C - Max: {props.main.temp_max}°C
      </p>
    </div>
  );
};

export default Card;
