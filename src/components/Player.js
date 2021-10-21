//************************** THE PLAYER SECTION *********************** */

// Wurd nachträglich nach App.js verschoben
import React, { useEffect } from "react";

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
  songs,
  setSongs,
  setCurrentSong,
}) => {
  //! useEffect

  //? Was ist useEffect: useEffect(callback, dependencyArray) // Mit dem useEffect-Hook können wir Lebenszyklusmethoden implementieren, um die Komponente anzuweisen, nach dem Rendern einen „Effekt“ auszuführen. Die verschiedenen Arten von Effekten sind unbegrenzt, z. B. das Ändern des Hintergrundbilds oder des Dokumenttitels, das Hinzufügen von Animationen oder Musik, das Abrufen von Daten und Abonnements.

  //! Wir benutzen hier den useEffect um den Titel auf active zu stellen / upzudaten, wenn wir den skip-forward oder skip-back Button benutzen

  useEffect(() => {
    // Add Active State
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
    setSongs(newSongs);
  }, [currentSong]);

  //! Event Handlers (For Playing the song)

  //? Was ist ein Event Handler: Event Handler sind Anweisungen oder Funktionen, die beim Eintreten eines Events wie click, touch oder beim submit eines Formulars Aktionen als Antwort auf das Ereignis durchführen. Die Event-Erkennung ist in Javascript schon eingebaut. Die Reaktion auf ein Event wird in Event Handlern programmiert, das sind spezielle Funktionen oder Methoden. Wir müssen festlegen, auf welchem Element wir ein Event erwarten und sagen, welche Funktion das Event behandeln soll.

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

  //! Skip Function

  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // console.log(`next index ${currentIndex + 1}`);
      // console.log(`songs length ${songs.length}`);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
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
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
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
          onClick={() => skipTrackHandler("skip-forward")}
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
