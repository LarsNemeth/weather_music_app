import React, { useEffect, useContext, useState } from 'react';
import { getWeatherData } from '../../services/apiKeys';
import { getCityImage } from '../../services/getCityImage';

import { weatherMusicContext } from '../../App';

const Weather = ({
  weatherStatus,
  city,
  setCity,
  weatherdata,
  setWeatherData,
}) => {
  const { changeMood } = useContext(weatherMusicContext);
  const [_city, _setCity] = useState(city);

  //! Get the Weatherdata from openweather
  const getData = async (city) => {
    try {
      const data = await getWeatherData(city);
      setWeatherData(data);
      // console.log('Data from my getDate-Funcion', data);
      changeMood(data);
    } catch (error) {
      console.log("Can't get no Data from openweather_API", error.message);
    }
  };

  // //! Get the ImageData from unsplash
  const getImageData = async (city) => {
    try {
      const data = await getCityImage(city);

      // console.log(data);
    } catch (error) {
      console.log("Can't get no Data from unsplash_API", error.message);
    }
  };

  //***************************************************************** */
  //* Change City Name *********
  const onChangeCity = (e) => {
    _setCity(e.target.value);
  };

  //* Button Function *********
  const onClickButton = () => {
    setCity(_city);
    getData(_city);
    getImageData(_city);
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

  // console.log('Clowdy, rainy or sunny', weatherdata.weather[0].main);
  // console.log('This is my weatherdata from Weather.js:', weatherdata);
  // console.log('This is my cityData:', city);

  return (
    <div className={`weather ${weatherStatus ? 'active-weather' : ''}`}>
      <div
        className="weather-app"
        style={{
          backgroundImage:
            'url(' + `https://source.unsplash.com/500x800/?${city}` + ')',
        }}
      >
        <div>
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
