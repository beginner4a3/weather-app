import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';
import { handleError } from '../utils/errorHandler';

const validateLocation = (location) => {
  if (!location || typeof location !== 'string') {
    throw new Error('Invalid location provided');
  }
  return location.trim();
};

const validateApiKey = () => {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
    throw new Error('OpenWeatherMap API key is not configured. Please add your API key to the .env file.');
  }
};

// Check if the location is in coordinates format (latitude,longitude)
const isCoordinates = (location) => {
  const coordPattern = /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/;
  return coordPattern.test(location);
};

export const getCurrentWeather = async (location) => {
  try {
    const validatedLocation = validateLocation(location);
    validateApiKey();
    
    let params = {
      appid: API_KEY,
      units: 'metric'
    };
    
    // If location is coordinates, use lat and lon parameters instead of q
    if (isCoordinates(validatedLocation)) {
      const [lat, lon] = validatedLocation.split(',');
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = validatedLocation;
    }
    
    const response = await axios.get(`${BASE_URL}/weather`, { params });
    
    return response.data;
  } catch (error) {
    throw handleError(error, 'getCurrentWeather');
  }
};

export const getForecast = async (location) => {
  try {
    const validatedLocation = validateLocation(location);
    validateApiKey();
    
    let params = {
      appid: API_KEY,
      units: 'metric'
    };
    
    // If location is coordinates, use lat and lon parameters instead of q
    if (isCoordinates(validatedLocation)) {
      const [lat, lon] = validatedLocation.split(',');
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = validatedLocation;
    }
    
    const response = await axios.get(`${BASE_URL}/forecast`, { params });
    
    return response.data;
  } catch (error) {
    throw handleError(error, 'getForecast');
  }
}; 