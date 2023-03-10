import axios from "axios";

const api = axios.create({
  baseURL: "http://api.openweathermap.org",
});

const { REACT_APP_API_KEY } = process.env;

export const getDataFromCities = async (name) => {
  try {
    const response = await api.get(
      `/geo/1.0/direct?q=${name}&limit=5&appid=${REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getDataFromWeather = async (lat, lon) => {
  try {
    const response = await api.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${REACT_APP_API_KEY}`
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
