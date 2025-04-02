import React from 'react';
import './CurrentWeather.css';

const CurrentWeather = ({ data }) => {
  const {
    name,
    main: { temp, humidity },
    weather: [{ description, icon }],
    wind: { speed }
  } = data;

  return (
    <div className="current-weather">
      <h2>{name}</h2>
      <div className="weather-info">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="weather-icon"
        />
        <div className="temperature">
          {Math.round(temp)}°C
        </div>
        <div className="description">
          {description.charAt(0).toUpperCase() + description.slice(1)}
        </div>
      </div>
      <div className="weather-details">
        <div className="detail">
          <span className="label">Wind:</span>
          <span className="value">{Math.round(speed)} km/h</span>
        </div>
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{humidity}%</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather; 