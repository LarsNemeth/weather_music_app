//************************** THE PLAYER SECTION *********************** */

// Wurde nachträglich nach App.js verschoben
import React, { useEffect } from "react";

//* Import Icons from Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Components I downloaded from "https://fontawesome.com/" (This is the actual components)
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons"; // This are the icons (like Play, Stop, FF, RW)

//* Import playAudio from util
// import { playAudio } from "../util";

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
  const activeLibraryHandler = (nextPrevious) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrevious.id) {
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
    console.log("hello from useEffect player.js");
  };

  //! useEffect

  //? Was ist useEffect: useEffect(callback, dependencyArray) // Mit dem useEffect-Hook können wir Lebenszyklusmethoden implementieren, um die Komponente anzuweisen, nach dem Rendern einen „Effekt“ auszuführen. Die verschiedenen Arten von Effekten sind unbegrenzt, z. B. das Ändern des Hintergrundbildes oder des Dokumenttitels, das Hinzufügen von Animationen oder Musik, das Abrufen von Daten und Abonnements.

  //! Wir benutzen hier den useEffect um den Titel auf active zu stellen / upzudaten, wenn wir den skip-forward oder skip-back Button benutzen

  useEffect(() => {
    // Add Active State
    // const newSongs = songs.map((song) => {
    //   if (song.id === currentSong.id) {
    //     return {
    //       ...song,
    //       active: true,
    //     };
    //   } else {
    //     return {
    //       ...song,
    //       active: false,
    //     };
    //   }
    // });
    // setSongs(newSongs);
    // console.log("hello from useEffect player.js");
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

  //! Function For Formating The Time

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  //! Skip Function

  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1]);
        //* wir müssen hier die playAudio-Componente einfügen, da sonst der Skip-Button ab Position 0 nicht mehr funktioniert
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
    }
    if (isPlaying) audioRef.current.play();
  };

  //! Add Styles (Fortschrittsbalken)
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  //? ************************* RETURN ***********************
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.currentTime) : "0:00"}</p>
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
