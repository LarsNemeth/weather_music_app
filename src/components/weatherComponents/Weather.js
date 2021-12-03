import React, { useState, useEffect, useContext } from 'react';
import { getWeatherData } from '../../services/apiKeys';

import { weatherMusicContext } from '../../App';

const Weather = ({ weatherStatus }) => {
  const [weatherdata, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const { changeMood } = useContext(weatherMusicContext);

  const getData = async () => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      console.log(data);
      changeMood(data);
    } catch (error) {
      console.log("Can't get no Data from API", error.message);
    }
  };

  //* Change City Name *********
  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  //* Button Function *********
  const onClickButton = () => {
    getData();
  };

  // //* UseEffect / getData running *********
  // useEffect(() => {
  //   getData();
  // }, []);

  //* Date Operator ******

  const dateBuilder = () => {
    let d = new Date();
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  //* Change Background-Image

  const bgChange = () => {
    if (weatherdata === null) {
      return;
    }

    const celcius = parseFloat(weatherdata.main.temp - 273.15).toFixed(0);
    if (celcius < 16) {
      return 'weather-app';
    } else {
      return 'weather-app-warm';
    }
  };

  console.log('Hello from me', weatherdata);

  return (
    <div className={`weather ${weatherStatus ? 'active-weather' : ''}`}>
      <div className="weather-app">
        <div className={bgChange()}>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="City Sounds"
              onChange={onChangeCity}
            />
            <button type="button" onClick={onClickButton}>
              Search
            </button>
          </div>
          {weatherdata != null ? (
            <div className="weather-wrap">
              <div className="location-box">
                <div className="location">
                  {weatherdata.name} | {weatherdata.sys.country}
                </div>
                <div className="date">{dateBuilder()}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {parseFloat(weatherdata.main.temp - 273.15).toFixed(0)}°C
                </div>
                <div className="weather-condition">
                  {weatherdata.weather[0].main}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Weather;
