// modules
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import firebaseConfig from './firebase';
import { getDatabase, ref, update, push, remove } from 'firebase/database';
import axios from 'axios';

// components
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Portfolio from './components/Portfolio';
// stylesheets
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  const [id, setId] = useState();
  const [investment, setInvestment] = useState(0);
  const [userMoney, setUserMoney] = useState(0);
  const [userCoins, setUserCoins] = useState([]);
  const [coinsAmt, setCoinsAmt] = useState();
  const [coins, setCoins] = useState([]);

  const database = getDatabase(firebaseConfig);
  const navigate = useNavigate();

  // populates user information on log in and then redirects to home
  function handleLogIn(userId, userName, userInvestment, userCash, userCoins) {
    setIsLoggedIn(true)

    setName(userName);
    setId(userId);
    setInvestment(userInvestment);
    setUserCoins(userCoins);
    setUserMoney(userCash);

    navigate('/');
  }

  // clears all user information on logout and redirects to home
  function handleLogOut() {
    setIsLoggedIn(false);

    setName('');
    setId('');
    setInvestment(0);
    setUserCoins([]);
    setUserMoney(0);

    navigate('/');
  }

  function addFunds(addedAmt) {
    setUserMoney(parseInt(userMoney) + addedAmt);
    setInvestment(parseInt(investment) + addedAmt);
  }

  function purchaseCoin(purchaseAmt, purchasedCoin) {
    if (purchaseAmt > userMoney) {
      alert('Insufficient Funds');
    } else {
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
      }
      // removes money from user's wallet
      setUserMoney(userMoney - purchaseAmt);
      alert(`You have purchased $${purchaseAmt} of ${purchasedCoin.name}`);
    }
  }

  function sellCoin(sellAmt, soldCoin) {
    console.log(sellAmt);
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
      // updates user's cash
      setUserMoney(userMoney + parseInt(sellAmt));
      alert(`You have sold ${sellAmt} of ${soldCoin.name}`)
    }
  }

  // this saves user info to db every time a transaction is made (ie. coin bought/sold & investment increased)
  useEffect(() => {
    if (isLoggedIn) {
      const dbRef = ref(database, `users/${id}`);

      update(dbRef, { investmentAmount: investment, cash: userMoney, coins: userCoins })
    }
  }, [userMoney])

  // this calculates user's net worth 
  useEffect(() => {
    if (userCoins.length > 0) {
      const amounts = userCoins.map((coin) => {
        const targetIndex = coins.findIndex((stockCoin) => stockCoin.name === coin.name)
        return coin.amt * coins[targetIndex].current_price;
      });
      let total = 0;
      for (let i = 0; i < amounts.length; i++) {
        total = total + amounts[i];
      }
      setCoinsAmt(parseFloat(total.toFixed(2)));
    } else {
      setCoinsAmt(0);
    }
  });


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
        handleLogOut={handleLogOut}
      />
      <Routes>
        <Route path="/"
          element={<Home
            name={name}
            coins={coins}
            coinsAmt={coinsAmt}
            investment={investment}
            addFunds={addFunds}
            userMoney={userMoney}
            isLoggedIn={isLoggedIn}
          />}
        />
        <Route path="/login"
          element={<Login
            database={database}
            isLoggedIn={isLoggedIn}
            handleLogIn={handleLogIn}
          />}
        />
        <Route path="/portfolio" element={<Portfolio
          isLoggedIn={isLoggedIn}
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