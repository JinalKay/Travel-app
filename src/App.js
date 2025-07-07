import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DestinationCard from './components/DestinationCard';
import Wishlist from './components/Wishlist';
import Game from './components/Game';
import './index.css';

const travelSeasons = {
  Japan: "April - June",
  India: "November - February",
  France: "May - September",
  Brazil: "May - October",
  Australia: "December - February",
  Canada: "June - October",
  Italy: "April - October",
  Thailand: "November - April",
  Egypt: "October - April"
};

const App = () => {
  const [destination, setDestination] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [regionFilter, setRegionFilter] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [gameMode, setGameMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) setWishlist(JSON.parse(stored));

    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const fetchCountry = async (countryName = null) => {
    try {
      const res = await axios.get(
        'https://restcountries.com/v3.1/all?fields=name,region,flags,capital,population,timezones'
      );
      const countries = res.data;

      let selected;
      if (countryName) {
        selected = countries.find(c => c.name.common.toLowerCase() === countryName.toLowerCase());
        if (!selected) {
          alert('❌ Country not found!');
          return;
        }
      } else {
        selected = countries[Math.floor(Math.random() * countries.length)];
      }

      const name = selected.name.common;
      const region = selected.region;
      const flag = selected.flags.png;
      const capital = selected.capital?.[0] || 'N/A';
      const population = selected.population || 0;
      const timezones = selected.timezones || [];

      const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_KEY;
      const unsplashRes = await axios.get(
        `https://api.unsplash.com/search/photos?query=${name}&client_id=${ACCESS_KEY}`
      );

      const results = unsplashRes.data.results;
      const images = results.length > 0
        ? results.slice(0, 5).map(photo => photo.urls.small)
        : [flag];

      setDestination({
        name,
        region,
        flag,
        images,
        capital,
        population,
        timezones,
        bestTime: travelSeasons[name] || "Varies by region"
      });

    } catch (err) {
      console.error('❌ Error fetching country:', err);
    }
  };

  const addToWishlist = () => {
    if (destination && !wishlist.some(d => d.name === destination.name)) {
      setWishlist([...wishlist, destination]);
    }
  };

  const handleSearch = () => {
    if (countrySearch.trim() === '') return;
    fetchCountry(countrySearch.trim());
    setCountrySearch('');
  };

  const filteredWishlist = regionFilter === 'All'
    ? wishlist
    : wishlist.filter(item => item.region === regionFilter);

  if (gameMode) {
    return (
      <div className="app">
        <div className="top-controls">
          <h1>🎮 Travel Quiz Game</h1>
          <button onClick={() => setGameMode(false)} className="dark-toggle">
            ⬅️ Back to Explorer
          </button>
        </div>
        <Game />
      </div>
    );
  }

  return (
    <div className="app">
      <h1>🌍 Travel Destination Explorer</h1>

      <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <div className="top-controls">
  <button className="discover" onClick={() => fetchCountry()}>
    {destination ? '🌎 Discover Another Destination' : '🌎 Discover Destination'}
  </button>

  <div className="filters-wrapper">
    <input
      type="text"
      value={countrySearch}
      onChange={(e) => setCountrySearch(e.target.value)}
      placeholder="🔍 Search country..."
      className="search-input"
      aria-label="Search by country name"
    />

    <button onClick={handleSearch} className="search-btn" aria-label="Search Country">
      🔍 Search
    </button>

    <select
      value={regionFilter}
      onChange={(e) => setRegionFilter(e.target.value)}
      className="region-filter"
      aria-label="Filter by region"
    >
      <option value="All">🌐 All Regions</option>
      <option value="Africa">🌍 Africa</option>
      <option value="Americas">🌎 Americas</option>
      <option value="Asia">🌏 Asia</option>
      <option value="Europe">🌍 Europe</option>
      <option value="Oceania">🌊 Oceania</option>
    </select>
  </div>
</div>


      {destination && (
        <DestinationCard destination={destination} onAdd={addToWishlist} />
      )}

      <Wishlist wishlist={filteredWishlist} />

      {/* Floating FAB Game Button */}
      <button className="game-fab" onClick={() => setGameMode(true)} title="Play Travel Quiz">
        🎮
      </button>
    </div>
  );
};

export default App;
