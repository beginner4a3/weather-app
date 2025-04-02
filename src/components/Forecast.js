import React from 'react';
import './Forecast.css';

const Forecast = ({ data }) => {
  // Group forecast data by day
  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-container">
        {Object.values(dailyForecasts).slice(0, 5).map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const {
            main: { temp },
            weather: [{ description, icon }]
          } = forecast;

          return (
            <div key={index} className="forecast-day">
              <div className="date">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </div>
              <img
                src={`http://openweathermap.org/img/wn/${icon}.png`}
                alt={description}
                className="forecast-icon"
              />
              <div className="forecast-temp">
                {Math.round(temp)}°C
              </div>
              <div className="forecast-desc">
                {description.charAt(0).toUpperCase() + description.slice(1)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast; 