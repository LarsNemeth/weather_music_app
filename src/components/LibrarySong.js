import React from 'react';
// Delete the util
// import { playAudio } from "../util";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);
    // // Add Active State
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

    console.log('select song');

    setSongs(newSongs);
    // check if the song is playing
    if (isPlaying) audioRef.current.play();

    // audioRef.current.play();

    //! This Code we are copying to the util-file
    // if (isPlaying) {
    //   const playPromise = audioRef.current.play();
    //   if (playPromise !== undefined) {
    //     playPromise.then((audio) => {
    //       audioRef.current.play();
    //     });
    //   }
    // }
  };

  return (
    // wenn der song active ist nimm die Klasse "selected", andernfalls nehme die leeren Anführungszeichen
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <div className="img-container">
        <img lat={song.name} src={song.cover} alt="moodMusic"></img>
        <div className="song-description">
          <h2>{song.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default LibrarySong;
