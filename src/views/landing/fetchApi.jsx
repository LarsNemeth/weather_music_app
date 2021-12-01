import React from "react";
import { apiKeys } from "../../services/apiKeys";

function fetchApi() {
  return (
    <div className="weather-app-container">
      <div className="search-box">
        <input type="text" className="search-bar" placeholder="Search..." />
        <p>Hello</p>
      </div>
    </div>
  );
}

export default fetchApi;
