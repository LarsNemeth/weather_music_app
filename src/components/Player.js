//************************** THE PLAYER SECTION *********************** */

//* Import the "useRef"
import React, { useRef } from "react";

//* Import Icons from Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Components I downloaded from "https://fontawesome.com/" (This is the actual components)
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons"; // This are the icons (like Play, Stop, FF, RW)

//*************************** CODE START *********************/

const Player = ({ currentSong }) => {
  //! Ref (introducing the html-refernce function with useRef)
  const audioRef = useRef(null); // The initial (starting) value is set to "null"
  //! Event Handlers (For Playing the song)
  //! We are directing to the current
  const playSongHandler = () => {
    audioRef.current.play();
    console.log(audioRef.current);
  };
  //? ************************* RETURN ***********************
  return (
    <div className="player">
      <div className="time-control">
        <p>Start</p>
        <input type="range" />
        <p>End</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      //* We are referencing to the html-link - We are parsing "useRef(null)"
      //* from above The starting point
      <audio ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
};

export default Player;
