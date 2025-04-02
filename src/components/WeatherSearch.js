import React, { useState } from 'react';
import './WeatherSearch.css';

const WeatherSearch = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onSearch(location.trim());
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onSearch(`${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="weather-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city, zip code, or coordinates"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
        <button
          type="button"
          onClick={handleCurrentLocation}
          className="location-button"
        >
          Use Current Location
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch; 