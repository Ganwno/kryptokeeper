// modules
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import firebaseConfig from '../firebase';
import { getDatabase } from 'firebase/database';
import axios from 'axios';

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
    const [coinsAmt, setCoinsAmt] = useState(); // calculated value of user's coins based on current market value
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

    // this calculates user's net worth 
    useEffect(() => {
        if (userCoins.length > 0) {
            const amounts = userCoins.map((coin) => {
                const targetIndex = coins.findIndex((stockCoin) => stockCoin.name === coin.name)
                return coin.amt * (targetIndex !== -1 ? coins[targetIndex].current_price : 0);
            });
            let total = 0;
            for (let i = 0; i < amounts.length; i++) {
                total = total + amounts[i];
            }
            setCoinsAmt(parseFloat(total.toFixed(2)));
        } else {
            setCoinsAmt(0);
        }
    }, [coins, userCoins]);



    // on page load, grab crypto data from API
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source()

        const getData = () => {
            axios({
                url: "https://api.coingecko.com/api/v3/coins/markets",
                method: "get",
                dataResponse: "json",
                params: {
                    vs_currency: "usd",
                    per_page: 1000,
                    price_change_percentage: "1h,24h,7d"
                }
            }, { cancelToken: source.token }).then((res) => {
                setCoins(res.data);
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('Successfully Aborted');
                } else {
                    alert("Fetch Error", err);
                }
            });
        }
        // performs a refresh of coins & prices every 15s
        const id = setInterval(getData, 15000)
        // immediately invokes the fetch request on launch
        getData();
        return () => {
            source.cancel();
            clearInterval(id);
        }
    }, [])

    return (
        <>
            <CoinDataProvider>
                <UserDataProvider >
                    <Navbar />
                    <div className="App-body">
                        <Routes>
                            <Route path="/"
                                element={<Home
                                    coinsAmt={coinsAmt}
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