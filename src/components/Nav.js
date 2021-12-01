import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { WiDaySnowThunderstorm } from "weather-icons-react";

function Nav({
  setLibraryStatus,
  libraryStatus,
  weatherStatus,
  setWeatherStatus,
}) {
  return (
    <nav>
      <button onClick={() => setWeatherStatus(!weatherStatus)}>
        Wetter
        <WiDaySnowThunderstorm
          icon={WiDaySnowThunderstorm}
          className="size-icon"
          style={{ height: 53, width: 36 }}
        />
      </button>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        Library
        <FontAwesomeIcon
          icon={faMusic}
          style={{ height: 53, width: 36 }}
          className="size-icon"
        />
      </button>
    </nav>
  );
}

export default Nav;
