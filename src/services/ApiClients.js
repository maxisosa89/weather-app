import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com/",
});

export const getDataFromCities = async (name) => {
  const response = await api.get(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      name +
      "&limit=5&appid=5d7c0b348647711b90c9eab8c453eca9"
  );
  return response.data;
};

export const getDataFromWeather = async (lat, lon) => {
  const response = await api.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5d7c0b348647711b90c9eab8c453eca9`
  );

  return response.data;
};
