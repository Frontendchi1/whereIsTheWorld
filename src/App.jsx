import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import CountryDetails from './components/Home/CountryDetails/CountryDetails';
import Navbar from './components/Home/Navbar'
import './App.css';
import Loader from './components/Home/Loader';

function App() {
 
  return (
    <div>
       <Router>
      
      <div className="App">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path='/' element={<Navbar/>}/>
        </Routes>
      </div>
    </Router>
    </div>
   
  );
}

export default App;
