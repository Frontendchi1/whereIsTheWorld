import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';



function Home() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [availableContinents, setAvailableContinents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios.get('https://api.example.com/data')
      .then(response => {
        setData(response.data);
        setIsLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      });
  }, []);

  

  

  

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);

        // Extract available continents from the fetched data
        const continents = Array.from(new Set(response.data.map((country) => country.region)));
        setAvailableContinents(['all', ...continents]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const isDarkModePreferred = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModePreferred);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (event) => {
    setRegionFilter(event.target.value);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const filteredCountries = countries.filter((country) => {
    if (regionFilter !== 'all' && regionFilter !== country.region) {
      return false;
    }
    return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
  });


    return (
      <div>
        
        {!isLoading && (
           <div className={`container ${darkMode ? 'dark' : 'light'}`}>
     
           <div className='first-mode'>
           <h1 className="title">Where is the World?</h1>
           <Link
             className="dark-mode-button"
             onClick={() => setDarkMode(!darkMode)}
           >
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z" fill="white" stroke="#111517" stroke-width="1.25"/>
             </svg>
             {darkMode ? 'Light Mode' : 'Dark Mode'}
           </Link>
           </div>
           <div className='second-mode'>
           <div className="search-bar">
           <input
          type="text"
          className="input-with-icon w-full px-4 py-2 rounded-lg border focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 padding-right:10"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
         </div>
              <div className="filters">
           <select className="select-region" value={regionFilter} onChange={handleFilter}>
               {availableContinents.map((continent) => (
                 <option key={continent} value={continent}>
                   {continent === 'all' ? 'Filter by Region' : continent}
                 </option>
               ))}
             </select>
            
           </div>
           </div>
          
              <div className="countries">
           {filteredCountries.map((country) => (
             <Link key={country.cca2} to={`/country/${country.cca2}`} className="country-link">
               <div className="country">
                 <img className='image' src={country.flags.png} alt={`${country.name.common} flag`} />
                 <h3>{country.name.common}</h3>
                 <p>Population: {country.population}</p>
                 <p>Region: {country.region}</p>
                 <p>Capital: {country.capital}</p>
               </div>
             </Link>
           ))}
         </div>
       </div>
        )}
      </div>
    );
  }
   

export default Home;
