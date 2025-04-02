import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('city'); // Default to city search

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case 'zip':
        return 'Enter ZIP/Postal Code (e.g., 90210)';
      case 'coordinates':
        return 'Enter Coordinates (e.g., 51.5074,-0.1278)';
      case 'city':
      default:
        return 'Enter City Name (e.g., London)';
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <div className="search-type-selector">
          <select 
            value={searchType} 
            onChange={(e) => setSearchType(e.target.value)}
            className="search-type-select"
          >
            <option value="city">City/Town</option>
            <option value="zip">ZIP/Postal Code</option>
            <option value="coordinates">Coordinates</option>
          </select>
        </div>
        <div className="search-input-container">
          <input
            type="text"
            placeholder={getPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 