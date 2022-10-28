// modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
// components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Portfolio from './components/Portfolio';
// stylesheets
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
  const [userPortfolio, setUserPortfolio] = useState([]);
  const [userMoney, setUserMoney] = useState(0)
  const [coins, setCoins] = useState([]);

  // temporary function for logging in and out to view different layouts and initializing user money
  function handleLogIn() {
    setIsLoggedIn(!isLoggedIn);
    setUserMoney(10000);
  }

  function displayUserInfo() {
    console.log(userMoney);
    console.log(userPortfolio)
  }


  function purchaseCoin(e) {
    e.preventDefault();
    alert('you purchased a coin')
  }

  // on page load, grab crypto data from API
  useEffect(() => {
    axios({
      url: "https://api.coingecko.com/api/v3/coins/markets",
      method: "get",
      dataResponse: "json",
      params: {
        vs_currency: "usd",
        per_page: 20
      }
    }).then((res) => {
      console.log(res.data);
      setCoins(res.data);
    })
  }, [])

  return (
    <div className="App">
      <Navbar
        isLoggedIn={isLoggedIn}
        handleLogIn={handleLogIn}
      />
      <Routes>
        <Route path="/" element={
          <Home
            coins={coins}
            userMoney={userMoney}
            isLoggedIn={isLoggedIn}
            displayUserInfo={displayUserInfo}
          />
        } />
        <Route path="/portfolio" element={<Portfolio
          purchaseCoin={purchaseCoin}
          coins={coins}
        />} />
      </Routes>
    </div>
  );
}

export default App;
