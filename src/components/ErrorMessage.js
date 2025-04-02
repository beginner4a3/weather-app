import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  // Check if this is an API key error
  const isApiKeyError = message.includes('API key');
  
  return (
    <div className="error-message">
      <p>{message}</p>
      {isApiKeyError && (
        <div className="error-help">
          <p>To fix this issue:</p>
          <ol>
            <li>Get an API key from <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></li>
            <li>Create a <code>.env</code> file in the root of your project</li>
            <li>Add your API key: <code>REACT_APP_OPENWEATHER_API_KEY=your_api_key_here</code></li>
            <li>Restart the application</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ErrorMessage; 