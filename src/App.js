import GlobalContext from "./context/GlobalContext";
import Home from "./pages/Home";
import { useState } from "react";

function App() {
  const [cards, setCards] = useState([
    {
      coord: {
        lon: -58.7878,
        lat: -34.4501,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 30.31,
        feels_like: 30.51,
        temp_min: 29.25,
        temp_max: 30.5,
        pressure: 1007,
        humidity: 61,
      },
      visibility: 10000,
      wind: {
        speed: 5.66,
        deg: 100,
      },
      clouds: {
        all: 0,
      },
      dt: 1678403955,
      sys: {
        type: 2,
        id: 2031574,
        country: "AR",
        sunrise: 1678355358,
        sunset: 1678400547,
      },
      timezone: -10800,
      id: 34350871,
      name: "Del Viso",
      cod: 200,
    },
    {
      coord: {
        lon: -58.7878,
        lat: -34.4501,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 30.31,
        feels_like: 30.51,
        temp_min: 29.25,
        temp_max: 30.5,
        pressure: 1007,
        humidity: 61,
      },
      visibility: 10000,
      wind: {
        speed: 5.66,
        deg: 100,
      },
      clouds: {
        all: 0,
      },
      dt: 1678403955,
      sys: {
        type: 2,
        id: 2031574,
        country: "AR",
        sunrise: 1678355358,
        sunset: 1678400547,
      },
      timezone: -10800,
      id: 34350872,
      name: "Del Viso2",
      cod: 200,
    },
    {
      coord: {
        lon: -58.7878,
        lat: -34.4501,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 30.31,
        feels_like: 30.51,
        temp_min: 29.25,
        temp_max: 30.5,
        pressure: 1007,
        humidity: 61,
      },
      visibility: 10000,
      wind: {
        speed: 5.66,
        deg: 100,
      },
      clouds: {
        all: 0,
      },
      dt: 1678403955,
      sys: {
        type: 2,
        id: 2031574,
        country: "AR",
        sunrise: 1678355358,
        sunset: 1678400547,
      },
      timezone: -10800,
      id: 34350873,
      name: "Del Viso3asdadsadasdasdaasdadasdasadasdasdsd",
      cod: 200,
    },
    {
      coord: {
        lon: -58.7878,
        lat: -34.4501,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01n",
        },
      ],
      base: "stations",
      main: {
        temp: 30.31,
        feels_like: 30.51,
        temp_min: 29.25,
        temp_max: 30.5,
        pressure: 1007,
        humidity: 61,
      },
      visibility: 10000,
      wind: {
        speed: 5.66,
        deg: 100,
      },
      clouds: {
        all: 0,
      },
      dt: 1678403955,
      sys: {
        type: 2,
        id: 2031574,
        country: "AR",
        sunrise: 1678355358,
        sunset: 1678400547,
      },
      timezone: -10800,
      id: 34350874,
      name: "Del Viso4",
      cod: 200,
    },
  ]);
  return (
    <GlobalContext.Provider value={{ cards, setCards }}>
      <Home />
    </GlobalContext.Provider>
  );
}

export default App;
