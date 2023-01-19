import React, { useState, useEffect, useContext } from 'react';
import firebaseConfig from '../firebase';
import { getDatabase, ref, update } from 'firebase/database';

const UserDataContext = React.createContext();
const UserDataUpdateContext = React.createContext();

export function useUserData() {
    return useContext(UserDataContext);
}

export function useUpdateUserData() {
    return useContext(UserDataUpdateContext);
}

export function UserDataProvider({ children }) {
    const database = getDatabase(firebaseConfig);
    const [userData, setUserData] = useState({
        name: '',
        id: '',
        investment: 0,
        money: 0,
        coins: [],
        isLoggedIn: false
    });

    // this saves user info to db every time a transaction is made (ie. coin bought/sold & investment increased)
    useEffect(() => {
        if (userData.isLoggedIn) {
            const dbRef = ref(database, `users/${userData.id}`);

            update(dbRef, { investmentAmount: userData.investment, cash: parseInt(userData.money), coins: userData.coins })
        }
    }, [userData, database])

    function updateUserData(type, userInput) {
        // will rcv value + type to check what type of transaction and process accordingly, if no type creates alert
        if (type === "LOGIN") {
            const newUser = {
                name: userInput[1],
                id: userInput[0],
                investment: userInput[2],
                money: userInput[3],
                coins: userInput[4] ? userInput[4] : [],
                isLoggedIn: true
            }
            setUserData(newUser);
        } else if (type === 'LOGOUT') {
            const newUser = {
                name: '',
                id: '',
                investment: 0,
                money: 0,
                coins: [],
                isLoggedIn: false
            };
            setUserData(newUser);
        } else if (type === "BUY") {
            const { amt, selectedCoin } = userInput;

            if (amt * selectedCoin.current_price > userData.money) {
                alert("Insufficient Funds");
            } else {
                // checks to see if the purchasedCoin already exists in user's coin wallet
                if (userData.coins.some(x => x.short === selectedCoin.symbol)) {
                    const updatedCoins = userData.coins.map((coin) => {
                        if (coin.short === selectedCoin.symbol) {
                            const newCoinObject = {
                                name: coin.name,
                                short: coin.short,
                                image: coin.image,
                                amt: (coin.amt + (amt / selectedCoin.current_price))
                            }
                            return newCoinObject;
                        } else {
                            return coin;
                        }
                    })
                    setUserData({ ...userData, coins: updatedCoins, money: userData.money - amt })
                } else {
                    // creates the coin object (code + amount, determined by how much they purchased divided by the current market value)
                    const coinObject = {
                        name: selectedCoin.name,
                        short: selectedCoin.symbol,
                        image: selectedCoin.image,
                        amt: (amt / selectedCoin.current_price)
                    }
                    // adds to new array which includes player's previous coins
                    const updatedCoins = [...userData.coins, coinObject]

                    // updates player's coin wallet
                    setUserData({ ...userData, coins: updatedCoins, money: userData.money - amt })
                }
                alert(`You have purchased $${amt} of ${selectedCoin.name}`);
            }
        } else if (type === "SELL") {
            const { amt, selectedCoin } = userInput;
            let finalAmt = parseInt(amt);
            //obtains index of coin fr user's coin array
            const userCoinIndex = userData.coins.findIndex((coin) => coin.name === selectedCoin.name);

            // checks to ensure the user has the necessary amount of coins to sell
            if (amt > userData.coins[userCoinIndex].amt * selectedCoin.current_price) {
                alert('You have insufficient coins to sell')
            } else {
                // determines the coin units based on the user sell price
                const amtSoldCoin = amt / selectedCoin.current_price;
                // if the remainder of stock would be less than $1, it will sell off the remaining stock to avoid unsellable amts

                if ((userData.coins[userCoinIndex].amt - amtSoldCoin) * selectedCoin.current_price < 1) {
                    finalAmt = userData.coins[userCoinIndex].amt * selectedCoin.current_price;
                }

                const updatedCoins = userData.coins.map((coin) => {
                    if (coin.name === selectedCoin.name) {
                        const newCoinObject = {
                            name: coin.name,
                            short: coin.short,
                            image: coin.image,
                            amt: (finalAmt === parseInt(amt) ? coin.amt - amtSoldCoin : 0)
                        }
                        return newCoinObject;
                    } else {
                        return coin;
                    }
                })
                setUserData({ ...userData, coins: updatedCoins, money: userData.money + parseInt(finalAmt.toFixed(2)) })

                alert(`You have sold $${finalAmt.toFixed(2)} of ${selectedCoin.name}`)
            }
        } else if (type === "INVESTMENT") {
            setUserData({ ...userData, money: userData.money + userInput, investment: userData.investment + userInput })
        } else {
            alert("INVALID TYPE");
        }
    }
    return (
        <UserDataContext.Provider value={userData}>
            <UserDataUpdateContext.Provider value={updateUserData}>
                {children}
            </UserDataUpdateContext.Provider>
        </UserDataContext.Provider>
    )
}