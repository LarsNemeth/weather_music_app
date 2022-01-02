import axios from 'axios';

const baseUrl = 'https://api.unsplash.com/photos/?';
const apiKey = 'MJjEHsquM6wGUZ-EaKn2JUfYGDHMMhcpVAqeq0L-cr0';

// baseUrl + `q=${cityname}&appid=${apiKey}`;

export const getCityImage = async (cityimage) => {
  try {
    const response = await axios.get(
      baseUrl + `q=${cityimage}&client_id=${apiKey}`
    );
    const data = await response.data;
    // console.log('My unsplash API from getCityImage', response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};
