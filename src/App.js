import React, { useState } from 'react';
import './App.css';
import WeatherDisplay from './components/WeatherDisplay';
import SearchBar from './components/SearchBar';
import { getCurrentWeather, getForecast } from './services/weatherService';

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
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude},${longitude}`;
          await fetchWeatherData(locationString);
          
          if (weatherData?.name) {
            setLocation(`${weatherData.name}, ${weatherData.sys.country}`);
          } else {
            setLocation(`Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (error) {
          setError(`Error getting weather for your location: ${error.message}`);
        }
      },
      (error) => {
        setLoading(false);
        
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
            if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
              setError(
                'Geolocation requires a secure connection (HTTPS). Please try searching by city name instead, or access this site via HTTPS.'
              );
            } else {
              setError(
                'An error occurred while getting your location. Please try searching by city name instead.'
              );
            }
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
          {window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && (
            <div className="https-warning">
              Note: "Use My Location" requires HTTPS. This feature works on localhost but may not work on some hosting environments.
            </div>
          )}
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
      <footer className="App-footer">
        <div className="footer-content">
          <div className="developer-info">
            <h3>Developer</h3>
            <p><strong>Name:</strong> Sweekar Sonti</p>
            <p><strong>Email:</strong> <a href="mailto:sontisweekar9@gmail.com">sontisweekar9@gmail.com</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/sweekarsonti" target="_blank" rel="noopener noreferrer">Sweekar Sonti</a></p>
          </div>
          <div className="pm-accelerator-info">
            <h3>About PM Accelerator</h3>
            <p>The Product Manager Accelerator Program is designed to support PM professionals through every stage of their careers. From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped over hundreds of students fulfill their career aspirations.</p>
            <p>Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed new PM and leadership skills, giving them a strong foundation for their future endeavors.</p>
            <div className="services-list">
              <h4>Our Services:</h4>
              <ul>
                <li>🚀 PMA Pro - End-to-end product manager job hunting program</li>
                <li>🚀 AI PM Bootcamp - Hands-on AI Product Management skills</li>
                <li>🚀 PMA Power Skills - Sharpen product management and leadership skills</li>
                <li>🚀 PMA Leader - Accelerate your career to Director and executive levels</li>
                <li>🚀 1:1 Resume Review - Stand out with a killer product manager resume</li>
              </ul>
            </div>
            <p>We also published over 500+ free training and courses. Check out our YouTube channel and Instagram for free learning resources.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
