import axios from "axios";

const baseUrl = "api.openweathermap.org/data/2.5/weather?";
const apiKey = "a2fbc8427096bcd8708e097c539237d3";

export const getWeatherData = async (cityname) => {
  try {
    const { data } = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
    return data;
  } catch (error) {
    throw error;
  }
};
