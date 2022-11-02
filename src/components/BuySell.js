import { useState } from 'react';
import { Link } from 'react-router-dom';
import useInputState from '../hooks/useInputState';
import CoinPriceChange from './CoinPriceChange';

import backButton from '../assets/images/circle-left-solid.svg';
import cryptocurrency from '../assets/images/coin-generic.svg';

export default function BuySell({ coins, userCoins, purchaseCoin, sellCoin }) {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [amt, updateAmt, resetAmt] = useInputState(0);
    const [coinIndex, setCoinIndex] = useState();

    function handleChange(e) {
        let selectCoin = coins.filter((coin) => {
            return coin.name === e.target.value;
        })
        setSelectedCoin(...selectCoin)
        // finds index of selected coin from user's coin wallet to gain access to the amt they own
        let targetCoin = userCoins.findIndex((coin) => coin.name === e.target.value);
        setCoinIndex(targetCoin);
        // clears amount to sell when coin changes
        resetAmt();
    }

    // when submits form to purchase, checks if amount is greater than 0 before committing to purchase
    function handleBuy() {
        if (selectedCoin !== "") {
            (amt > 0 && purchaseCoin(amt, selectedCoin));
        } else {
            alert("Please select a coin");
        }
        resetAmt();
    }

    function handleSell() {
        sellCoin(parseInt(amt), selectedCoin);
        resetAmt();
    }

    return (
        <div className="BuySell-formCard">
            <div className="BuySell-backButtonContainer">
                <Link to="/" className="backButton"><img src={backButton} className="navIcon backButton" alt="back button" /></Link>
            </div>

            <div className="BuySell-formInfo">
                <div className="formImage">
                    <img 
                    src={(selectedCoin ? selectedCoin.image : cryptocurrency)} className={`Coin-bsImg ${!selectedCoin && 'BuySell-placeholderImg'}`}
                    alt={selectedCoin ? selectedCoin.name : "cryptocurrency"} />
                </div>
                <span>Coin: <strong>{selectedCoin.name}</strong></span>
                <span>Current Price: ${selectedCoin ? selectedCoin.current_price : "0.00"}</span>
                <span>ATH: ${selectedCoin ? (selectedCoin.ath > 0.01 ? selectedCoin.ath.toFixed(2) : selectedCoin.ath.toFixed(5)) : "0.00"}</span>
                <span>ATL: ${selectedCoin ? (selectedCoin.atl > 0.01 ? selectedCoin.atl.toFixed(2) : selectedCoin.atl.toFixed(5)) : "0.00"}</span>

                <span>
                    <CoinPriceChange period="1h" priceChange={selectedCoin ? selectedCoin.price_change_percentage_1h_in_currency : 0} />
                </span>
                <span>
                    <CoinPriceChange period="24h" priceChange={selectedCoin ? selectedCoin.price_change_percentage_24h_in_currency : 0} />
                </span>
                <span>
                    <CoinPriceChange period="7d" priceChange={selectedCoin ? selectedCoin.price_change_percentage_7d_in_currency : 0} />
                </span>
                <span>Coins Owned: {userCoins[coinIndex] ? userCoins[coinIndex].amt.toFixed(5) : 0}</span>
                <span>Coins Owned Value: {userCoins[coinIndex] ? (userCoins[coinIndex].amt * selectedCoin.current_price).toFixed(2) : "$0.00"}</span>
            </div>
            <form className="form">
                <label className="sr-only">Coin:</label>
                {/* populates dropdown list with variety of coins */}
                <select onChange={(e) => handleChange(e)} className="BuySell-input" data-dropup-auto="false" defaultValue="">
                    <option value="" disabled>Please select a coin</option>
                    {coins.map((coin) => {
                        return <option key={coin.name}>{coin.name}</option>
                    })}
                </select>

                <label htmlFor="bsAmount" className="sr-only">Amount:</label>
                <input type="number" name="bsAmount" className="BuySell-input" value={amt} onChange={updateAmt} min="1" required />

            </form>
            <button onClick={() => handleBuy()} className="button BuySell-button bgAccent">Buy</button>
            <button onClick={() => handleSell()} className="button BuySell-button bgAccent">Sell</button>
        </div>
    )
}