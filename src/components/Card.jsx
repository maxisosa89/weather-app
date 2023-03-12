import React from "react";
import "./Card.css";

const Card = (props) => {
  const date = new Date(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "UTC" })
    ).getTime() +
      props.timezone * 1000
  );
  const dayOrNight = props.weather[0].icon.slice(-1);
  return (
    <div className={`card-container ${dayOrNight}`}>
      <h1 className="card-text card-title">
        {props.name.toUpperCase()} - {props.sys.country.toUpperCase()}
      </h1>
      <div className="card-content">
        <div className="card-date-container">
          <p className="card-text card-date">
            {date.getDate().toString().padStart(2, "0")}/
            {`${(date.getMonth() + 1).toString().padStart(2, "0")}`}/
            {date.getFullYear()} - {date.getHours().toString().padStart(2, "0")}
            :{date.getMinutes().toString().padStart(2, "0")}
          </p>
        </div>
        <div className="card-temperature-container">
          <p className="card-text card-temperature">
            {props.main.temp.toFixed()}°C
          </p>
          <div className="card-weather-container">
            <img
              className="card-weather-icon"
              src={`https://openweathermap.org/img/wn/${props.weather[0].icon}@2x.png`}
              alt="ClimaImg"
              width="80px"
              height="80px"
            />
            <p className="card-text card-weather-description">
              {props.weather[0].description.toUpperCase()}
            </p>
          </div>
        </div>
      </div>
      <p className="card-text card-temperature-range">
        MIN: {props.main.temp_min.toFixed()}°C - MAX:{" "}
        {props.main.temp_max.toFixed()}°C
      </p>
    </div>
  );
};

export default Card;
