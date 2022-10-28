import { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './components/Navbar';
import './App.css';
import CoinList from './components/CoinList';

function App() {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [coins, setCoins] = useState([]);

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
      <Navbar />
      <CoinList coins={coins} />
    </div>
  );
}

export default App;
