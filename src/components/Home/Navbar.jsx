import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <div className="navbar">
      <Link to="/" className="navbar-title">
        Where is the World?
      </Link>
      <button className="dark-mode-button" onClick={toggleDarkMode}>
        {darkMode ? (
          <span>
            Light Mode  <img src="/public/half-moon" alt="Image 1" />
          </span>
        ) : (
          <span>
            Dark Mode <i className="fas fa-moon"></i>
          </span>
        )}
      </button>
    </div>
  );
}

export default Navbar;