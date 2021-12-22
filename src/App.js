import React, { useState, useRef, createContext } from 'react';

// Import Styles
import './styles/app.scss';

// Import Components
import Intro from './components/Intro';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import Weather from './components/weatherComponents/Weather';

//Import Util
import data from './data';

// Export weatherMuscicContext API

export const weatherMusicContext = createContext({});

function App() {
  //! Ref (introducing the html-refernce function with useRef)
  const audioRef = useRef(null); // The initial (starting) value is set to "null"
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  //! State For Time (aktuell)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  //! Library State
  const [libraryStatus, setLibraryStatus] = useState(false);

  //! IntroLogo
  const [intro, setIntro] = useState(null);

  //! Weather State
  const [weatherStatus, setWeatherStatus] = useState(false);
  const [weatherdata, setWeatherData] = useState(null);

  //! Weather City
  const [city, setCity] = useState('Hamburg');

  //! Time Update
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //! Berechnung der Prozent des Fortschrittsbalken
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    // console.log(animation);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
    // console.log(current);
  };

  //! Change Music Weater Mood Context API
  // const [weatherMood, setWeatherMood] = useState(null);
  const changeMood = (weatherdata) => {
    // const celcius = parseFloat(weatherdata.main.temp - 273.15).toFixed(0);
    const weatherCondition = weatherdata.weather[0].main;
    if (weatherCondition === 'Snow') {
      setCurrentSong(songs[2]);
    }
    if (weatherCondition === 'Clouds') {
      setCurrentSong(songs[3]);
    }
    if (weatherCondition === 'Rain') {
      setCurrentSong(songs[0]);
    }
    if (weatherCondition === 'Clear') {
      setCurrentSong(songs[1]);
    }
    if (weatherCondition === 'Mist') {
      setCurrentSong(songs[4]);
    }
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    // console.log('select song');

    setSongs(newSongs);
    // check if the song is playing
    if (isPlaying) audioRef.current.play();
  };

  //! Change Music Weater Mood Context-API

  const bgimgChange = () => {
    // console.log(weatherdata);
    if (weatherdata === null) {
      return;
    }

    // const celcius = parseFloat(weatherdata.main.temp - 273.15).toFixed(0);
    const weatherCondition = weatherdata.weather[0].main;

    //! Snow
    if (weatherCondition === 'Snow') {
      return 'weather-app-snow';
    }
    //! Clowds
    if (weatherCondition === 'Clouds') {
      return 'weather-app-clowds';
    }
    //! Rain
    if (weatherCondition === 'Rain') {
      return 'weather-app-rain';
      //! Sun
    }
    if (weatherCondition === 'Clear') {
      return 'weather-app-sun';
    }
    //!Mist
    if (weatherCondition === 'Mist') {
      return 'weather-app-mist';
    }
  };

  //! Wenn der Song endet spiele den nächsten // Brauchen wir nicht beim Streamen ggf. bei Wetterwechsel
  // const songEndHandler = async () => {
  //   let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  //   await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  //   if (isPlaying) audioRef.current.play();
  // };

  //* return ************
  return (
    <weatherMusicContext.Provider value={{ changeMood }}>
      <div className={`bg-starter-img`}>
        <div className={bgimgChange()}>
          <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
            <div className={`App ${weatherStatus ? 'weather-active' : ''}`}>
              <Nav
                libraryStatus={libraryStatus}
                setLibraryStatus={setLibraryStatus}
                weatherStatus={weatherStatus}
                setWeatherStatus={setWeatherStatus}
              />
              <Weather
                weatherStatus={weatherStatus}
                city={city}
                setCity={setCity}
                weatherdata={weatherdata}
                setWeatherData={setWeatherData}
              />
              <div>
                <Song
                  currentSong={currentSong}
                  isPlaying={isPlaying}
                  intro={intro}
                  setIntro={setIntro}
                />
                <Player
                  audioRef={audioRef}
                  setIsPlaying={setIsPlaying}
                  isPlaying={isPlaying}
                  currentSong={currentSong}
                  setSongInfo={setSongInfo}
                  songInfo={songInfo}
                  songs={songs}
                  setSongs={setSongs}
                  setCurrentSong={setCurrentSong}
                />
                <Library
                  audioRef={audioRef}
                  songs={songs}
                  setCurrentSong={setCurrentSong}
                  isPlaying={isPlaying}
                  setSongs={setSongs}
                  libraryStatus={libraryStatus}
                />
                <audio
                  onTimeUpdate={timeUpdateHandler}
                  onLoadedMetadata={timeUpdateHandler}
                  ref={audioRef}
                  src={currentSong.audio}
                  //! Skip to the next song if ended // Brauchen wir (noch nicht)
                  // onEnded={songEndHandler}
                ></audio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </weatherMusicContext.Provider>
  );
}

export default App;
