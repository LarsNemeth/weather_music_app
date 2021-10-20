//************************** THE PLAYER SECTION *********************** */

// Wurd nachträglich nach App.js verschoben
import React from "react";

//* Import Icons from Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Components I downloaded from "https://fontawesome.com/" (This is the actual components)
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; // This are the icons (like Play, Stop, FF, RW)

//*************************** CODE START *********************/

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  setSongInfo,
  songInfo,
}) => {
  //! Event Handlers (For Playing the song)
  //! We are directing to the current
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
      // console.log(audioRef.current);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  //! Skipping in the Song itself (mit dem Fortschritts-Balken)
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //! Function For Formating The Time

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //? ************************* RETURN ***********************
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.currentTime)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          //  icon = { if (isPlaying){
          //    return faPause
          //  }
          //  else {faPlay}}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      {/* We are referencing to the html-link - We are parsing "useRef(null)"
      from above The starting point */}
    </div>
  );
};

export default Player;
