import React from "react";
import "./Details.css";

const props = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 298.48,
    feels_like: 298.74,
    temp_min: 297.56,
    temp_max: 300.05,
    pressure: 1015,
    humidity: 64,
    sea_level: 1015,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    "1h": 3.16,
  },
  clouds: {
    all: 100,
  },
  dt: 1661870592,
  sys: {
    type: 2,
    id: 2075663,
    country: "IT",
    sunrise: 1661834187,
    sunset: 1661882248,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};

const Details = () => {
  return (
    <div className="details-container">
      <div>
        <h1>{props.name}</h1>
      </div>
      <div>
        <p>Fecha: xx/xx/xxxx</p>
        <p>Hora: xx:xx</p>
      </div>
      <div>
        <h3>Coordenadas</h3>
        <p>Latitud: {props.coord.lat}</p>
        <p>Longitud: {props.coord.lon}</p>
      </div>
      <div>
        <h3>Datos del clima</h3>
        <p>Temperatura: {props.main.temp} °C</p>
        <p>Sensación térmica: {props.main.feels_like} °C</p>
        <p>Presión atmosférica: {props.main.pressure} hPa</p>
        <p>Humedad: {props.main.humidity} %</p>
        <p>Mínima en la zona: {props.main.temp_min} °C</p>
        <p>Máxima en la zona: {props.main.temp_max} °C</p>
      </div>
      <div>
        <h3>Estado del clima</h3>
        {props.weather.map((w) => (
          <div key={w.id}>
            <p>{w.description}</p>
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="" />
          </div>
        ))}
      </div>

      <div>
        <h3>Visibilidad y viento</h3>
        <p>Visibilidad: {props.visibility} mts</p>
        <p>Velocidad viento: {props.wind.speed} mts/s</p>
        <p>Dirección del viento: {props.wind.deg}</p>
      </div>
    </div>
  );
};

export default Details;
