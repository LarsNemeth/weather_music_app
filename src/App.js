import React, { useState, useRef, createContext } from 'react';

// Import Styles
import './styles/app.scss';

// Import Components
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import Weather from './components/weatherComponents/Weather';

//Import Util
import data from './data';
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

  //! Weather State
  const [weatherStatus, setWeatherStatus] = useState(false);

  //! Time Update
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    //! Berechnung der Prozent des Fortschrittsbalken
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    console.log(animation);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
    console.log(current);
  };

  //! Weaterh Mood Context API
  // const [weatherMood, setWeatherMood] = useState(null);
  const changeMood = (weatherdata) => {
    const celcius = parseFloat(weatherdata.main.temp - 273.15).toFixed(0);
    if (celcius < 16) {
      setCurrentSong(songs[0]);
    } else {
      setCurrentSong(songs[1]);
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
      <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
        <div className={`App ${weatherStatus ? 'weather-active' : ''}`}>
          <Nav
            libraryStatus={libraryStatus}
            setLibraryStatus={setLibraryStatus}
            weatherStatus={weatherStatus}
            setWeatherStatus={setWeatherStatus}
          />
          <Song currentSong={currentSong} />
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
          <Weather weatherStatus={weatherStatus} />
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
    </weatherMusicContext.Provider>
  );
}

export default App;
