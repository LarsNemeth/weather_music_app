import React, { useState, useRef } from "react";

// Import Styles
import "./styles/app.scss";

// Import Components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

//Import Util
import data from "./util";

function App() {
  //! Ref (introducing the html-refernce function with useRef)
  const audioRef = useRef(null); // The initial (starting) value is set to "null"
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  //! State For Time (aktuell und)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  //! Time Update
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration });
    console.log(current);
  };

  //* return ************
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying}
        currentSong={currentSong}
        setSongInfo={setSongInfo}
        songInfo={songInfo}
      />
      <Library
        audioRef={audioRef}
        songs={songs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
