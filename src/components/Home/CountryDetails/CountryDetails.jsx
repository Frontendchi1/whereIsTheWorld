import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './CountryDetails.css';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from local storage
    const isDarkModePreferred = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkModePreferred);
  }, []);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
        setCountry(response.data);
        setBorderCountries(response.data.borders);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [code]);

  useEffect(() => {
    // Apply dark mode class to body
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    
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
      {country && (
        <div className="country-details">
          <div className="header">
          <Link to="/" className="back-button">
        <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.38988 8.1464C4.18284 7.93936 4.18284 7.62251 4.38988 7.41547L7.56825 4.2371C7.77529 4.03006 8.09215 4.03006 8.29919 4.2371C8.50623 4.44414 8.50623 4.761 8.29919 4.96804L5.95736 7.30987H12.4999C12.7761 7.30987 12.9999 7.53372 12.9999 7.80987C12.9999 8.08603 12.7761 8.30987 12.4999 8.30987H5.95736L8.29919 10.6517C8.50623 10.8588 8.50623 11.1757 8.29919 11.3828C8.09215 11.5898 7.77529 11.5898 7.56825 11.3828L4.38988 8.20446C4.18284 7.99742 4.18284 7.68057 4.38988 7.47353L4.38988 8.1464Z"
      fill="currentColor"
    />
  </svg>
  Back
</Link>

            <img src={country.flags.png} alt={`${country.name} flag`} />
          </div>
          <div className="country-info">
            <h2>{country.name}</h2>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Subregion: {country.subregion}</p>
            <p>Capital: {country.capital}</p>
          </div>
          {borderCountries.length > 0 && (
            <div className="border-countries">
              <p>Border Countries:</p>
              <ul>
                {borderCountries.map((borderCode) => {
                  return (
                    <li key={borderCode}>
                      <Link to={`/country/${borderCode}`}>
                        <button className="border-button">
                          {borderCode}
                        </button>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CountryDetails;
