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
  const [userMoney, setUserMoney] = useState(0);
  const [userCoins, setUserCoins] = useState([])
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


  function purchaseCoin(purchaseAmt, purchasedCoin) {
    if (purchaseAmt > userMoney) {
      alert('Insufficient Funds');
    } else {
      alert(`You have purchased $${purchaseAmt} of ${purchasedCoin.name}`)
      // removes money from user's wallet
      setUserMoney(userMoney - purchaseAmt);

      // checks to see if the purchasedCoin already exists in user's coin wallet
      if (userCoins.some(x => x.short === purchasedCoin.symbol)) {
        const updatedCoins = userCoins.map((coin) => {
          if (coin.short === purchasedCoin.symbol) {
            const newCoinObject = { name: coin.name, short: coin.short, image: coin.image, amt: (coin.amt + (purchaseAmt / purchasedCoin.current_price)) }
            return newCoinObject;
          } else {
            return coin;
          }
        })
        setUserCoins(updatedCoins, console.log(userCoins))
      } else {
        // creates the coin object (code + amount, determined by how much they purchased divided by the current market value)
        const coinObject = { name: purchasedCoin.name, short: purchasedCoin.symbol, image: purchasedCoin.image, amt: (purchaseAmt / purchasedCoin.current_price) }
        // adds to new array which includes player's previous coins
        const updatedCoins = [...userCoins, coinObject]
        // updates player's coin wallet
        setUserCoins(updatedCoins, console.log(userCoins))
      }
    }
  }

  function sellCoin(sellAmt, soldCoin) {
    const coinPrice = coins[coins.findIndex((coin => coin.name === soldCoin.name))].current_price;
    const userCoinIndex = userCoins.findIndex((coin) => coin.name === soldCoin.name);
    const amtSoldCoin = sellAmt / coinPrice;
    if (sellAmt > userCoins[userCoinIndex].amt * coinPrice) {
      alert('You have insufficient coins to sell')
    } else {
      setUserMoney(userMoney + parseInt(sellAmt));

      const updatedCoins = userCoins.map((coin) => {
        if (coin.name === soldCoin.name) {
          if (coin.amt > amtSoldCoin) {
            const newCoinObject = { name: coin.name, short: coin.short, image: coin.image, amt: (coin.amt - amtSoldCoin) }
            return newCoinObject;
          }
        } else {
          return coin;
        }
      })
      setUserCoins(updatedCoins);
      alert(`You have sold ${sellAmt} of ${soldCoin.name}`)
    }
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
          userMoney={userMoney}
          userCoins={userCoins}
          purchaseCoin={purchaseCoin}
          sellCoin={sellCoin}
          coins={coins}
        />} />
      </Routes>
    </div>
  );
}

export default App;