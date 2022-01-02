import React from 'react';

//*{`App ${libraryStatus ? 'library-active' : ''}`}

const Song = ({ currentSong, isPlaying, intro, setIntro }) => {
  const starterConditionCover = currentSong.cover;
  const starterConditionName = currentSong.name;
  const starterConditionArtist = currentSong.artist;

  return (
    <div className="song-container">
      <img
        lat={currentSong.name}
        src={`${isPlaying ? starterConditionCover : ''}`}
        alt={`${isPlaying ? 'coverArtwork' : ''}`}
      ></img>
      <h2>{`${isPlaying ? starterConditionName : ''}`}</h2>
      <h3>{`${isPlaying ? starterConditionArtist : ''}`}</h3>
    </div>
  );
};

export default Song;
