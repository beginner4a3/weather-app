export class WeatherAppError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'WeatherAppError';
    this.code = code;
    this.originalError = originalError;
  }
}

export const ErrorCodes = {
  API_ERROR: 'API_ERROR',
  INVALID_LOCATION: 'INVALID_LOCATION',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
};

export const handleError = (error, context) => {
  if (error.response) {
    // API responded with an error
    if (error.response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeatherMap API key configuration.');
    }
    if (error.response.status === 404) {
      throw new Error('Location not found. Please check the city name, zip code, or coordinates and try again. Note: Landmarks are not directly supported - try using the city name instead.');
    }
    throw new Error(`Weather data unavailable: ${error.response.data.message || 'Unknown error'}`);
  }
  
  if (error.request) {
    // Request was made but no response received
    throw new Error('Unable to connect to weather service. Please check your internet connection.');
  }
  
  // Something else went wrong
  throw new Error(`An error occurred while fetching weather data: ${error.message}`);
}; 