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
        setUserCoins(updatedCoins);
        alert(`You have purchased $${purchaseAmt} of ${purchasedCoin.name}`);
      }
    }
  }

  function sellCoin(sellAmt, soldCoin) {
    // obtains current price of the coin to be sold
    const coinPrice = coins[coins.findIndex((coin => coin.name === soldCoin.name))].current_price;
    // obtains index of coin in user's coin array
    const userCoinIndex = userCoins.findIndex((coin) => coin.name === soldCoin.name);
    // determines the coin units based on the user sell price
    const amtSoldCoin = sellAmt / coinPrice;
    // checks to ensure the user has the necessary amount of coins to sell
    if (sellAmt > userCoins[userCoinIndex].amt * coinPrice) {
      alert('You have insufficient coins to sell')
    } else {
      // updates user's cash
      setUserMoney(userMoney + parseInt(sellAmt));
      // updates the user's coin array, removing information if the user sold the entire stock of coin
      if (userCoins[userCoinIndex].amt === amtSoldCoin) {
        const updatedCoins = userCoins.filter((coin) => coin.name !== soldCoin.name)
        setUserCoins(updatedCoins);
      } else {
        const updatedCoins = userCoins.map((coin) => {
          if (coin.name === soldCoin.name) {
            const newCoinObject = { name: coin.name, short: coin.short, image: coin.image, amt: (coin.amt - amtSoldCoin) }
            return newCoinObject;
          } else {
            return coin;
          }
        })
        setUserCoins(updatedCoins);
      }

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