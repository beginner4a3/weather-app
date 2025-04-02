import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weatherData, forecastData, location }) => {
  // Format temperature with degree symbol
  const formatTemp = (temp) => `${Math.round(temp)}°C`;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString * 1000);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get weather icon URL
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-display">
      <h2 className="location">{location}</h2>
      
      {/* Current Weather */}
      <div className="current-weather">
        <div className="weather-main">
          <img 
            src={getWeatherIcon(weatherData.weather[0].icon)} 
            alt={weatherData.weather[0].description} 
            className="weather-icon"
          />
          <div className="temperature">{formatTemp(weatherData.main.temp)}</div>
        </div>
        
        <div className="weather-details">
          <div className="weather-description">
            {weatherData.weather[0].description}
          </div>
          <div className="weather-info">
            <div>Feels like: {formatTemp(weatherData.main.feels_like)}</div>
            <div>Humidity: {weatherData.main.humidity}%</div>
            <div>Wind: {weatherData.wind.speed} m/s</div>
          </div>
        </div>
      </div>
      
      {/* Forecast */}
      <div className="forecast">
        <h3>5-Day Forecast</h3>
        <div className="forecast-container">
          {forecastData.list
            .filter((item, index) => index % 8 === 0) // Get one forecast per day
            .map((item, index) => (
              <div key={index} className="forecast-item">
                <div className="forecast-date">{formatDate(item.dt)}</div>
                <img 
                  src={getWeatherIcon(item.weather[0].icon)} 
                  alt={item.weather[0].description} 
                  className="forecast-icon"
                />
                <div className="forecast-temp">
                  {formatTemp(item.main.temp)}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay; 