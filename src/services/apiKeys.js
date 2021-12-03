import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'a2fbc8427096bcd8708e097c539237d3';

export const getWeatherData = async (cityname) => {
  try {
    console.log(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`
    );
    const response = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);

    console.log('data', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//* It would work when putting a city inside because than i am calling the function
// getWeatherData();
