import React, { useState, useEffect } from 'react';
import { getWeatherData } from '../../services/apiKeys';

const Weather = ({ weatherStatus }) => {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('Berlin');
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const data = await getWeatherData(city);
      console.log(data);
    } catch (error) {
      console.log("Can't get no Data from API", error.message);
    }
  };

  // const onChangeCity = (e) => {
  //   setCity(e.target.value);
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={`weather ${weatherStatus ? 'active-weather' : ''}`}>
      <div className="weather-main">
        <div className="weather-app">
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="City Sounds"
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="button" onClick={() => getData()}>
              Search
            </button>
          </div>

          <div className="weather-wrap">
            <div className="location-box">
              <div className="location">Hamburg, Germany</div>
              <div className="date">Monday 20 November 2020</div>
            </div>
            <div className="weather-box">
              <div className="temp">9°C</div>
              <div className="weather-condition">Rain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
