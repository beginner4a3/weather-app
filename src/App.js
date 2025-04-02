import React, { useState, useEffect } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import { getCurrentWeather, getForecast } from './services/weatherService';
import { handleError } from './utils/errorHandler';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');

  const fetchWeatherData = async (searchLocation) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentWeather = await getCurrentWeather(searchLocation);
      const forecast = await getForecast(searchLocation);
      
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setLocation(searchLocation);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchLocation) => {
    if (searchLocation.trim()) {
      fetchWeatherData(searchLocation);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please try searching by city name instead.');
      return;
    }

    setLoading(true);
    setError(null);

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,        // 10 seconds timeout
      maximumAge: 0         // Force fresh location
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Got coordinates:', latitude, longitude); // Debug log
          
          const locationString = `${latitude},${longitude}`;
          console.log('Location string:', locationString); // Debug log
          
          const currentWeather = await getCurrentWeather(locationString);
          console.log('Weather data received:', currentWeather); // Debug log
          
          const forecast = await getForecast(locationString);
          
          setWeatherData(currentWeather);
          setForecastData(forecast);
          
          // Use the city name from the API response if available
          if (currentWeather.name) {
            setLocation(`${currentWeather.name}, ${currentWeather.sys.country}`);
          } else {
            setLocation(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          console.error('Error fetching weather data:', error); // Debug log
          setError(`Error getting weather for your location: ${error.message}`);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setLoading(false);
        console.error('Geolocation error:', error); // Debug log
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError(
              'Location access was denied. Please enable location access in your browser settings or try searching by city name.'
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setError(
              'Unable to detect your location. This might be due to GPS being disabled or being indoors. Please try searching by city name instead.'
            );
            break;
          case error.TIMEOUT:
            setError(
              'Location request timed out. Please check your GPS settings and internet connection, or try searching by city name.'
            );
            break;
          default:
            setError(
              'An error occurred while getting your location. Please try searching by city name instead.'
            );
        }
      },
      geolocationOptions
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
      </header>
      <main>
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          <button 
            className="current-location-button"
            onClick={getCurrentLocation}
            disabled={loading}
          >
            {loading ? 'Getting Location...' : 'Use My Location'}
          </button>
        </div>
        {loading && <div className="loading">Loading weather data...</div>}
        {error && <div className="error">{error}</div>}
        {weatherData && forecastData && (
          <WeatherDisplay 
            weatherData={weatherData} 
            forecastData={forecastData} 
            location={location} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
