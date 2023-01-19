// modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import firebaseConfig from '../firebase';
import { getDatabase } from 'firebase/database';

import { UserDataProvider } from './ContextUserData';
import { CoinDataProvider } from './ContextCoinData';

// components
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Portfolio from './Portfolio';
import Register from './Register';
import Footer from './Footer';
import ErrorPage from './ErrorPage';


export default function Kryptokeeper() {
    const [investment, setInvestment] = useState(0);
    const [userMoney, setUserMoney] = useState(0);
    const [userCoins, setUserCoins] = useState([]);

    // data to populate information regarding various cryptocurrency
    const [coins, setCoins] = useState([]);

    const database = getDatabase(firebaseConfig);

    // this function allows the user to add more money to their investment
    function addFunds(addedAmt) {
        setUserMoney(parseInt(userMoney) + addedAmt);
        setInvestment(parseInt(investment) + addedAmt);
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



    return (
        <>
            <CoinDataProvider>
                <UserDataProvider >
                    <Navbar />
                    <div className="App-body">
                        <Routes>
                            <Route path="/"
                                element={<Home
                                    addFunds={addFunds}
                                />}
                            />
                            <Route path="/login"
                                element={<Login
                                    database={database}
                                />}
                            />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register"
                                element={<Register
                                    database={database}
                                />}
                            />
                            <Route path="/portfolio"
                                element={<Portfolio
                                    sellCoin={sellCoin}
                                />}
                            />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </div>
                </UserDataProvider>
            </CoinDataProvider>
            <Footer />
        </>
    );
}