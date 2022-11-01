import { useState } from 'react';
import useInputState from '../hooks/useInputState';

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
        <div className="formCard">
            <form className="form">
                <label>Stock to purchase:</label>
                {/* populates dropdown list with variety of coins */}
                <select onChange={(e) => handleChange(e)} data-dropup-auto="false" defaultValue="">
                    <option value="" disabled>Please select a coin</option>
                    {coins.map((coin) => {
                        return <option key={coin.name}>{coin.name}</option>
                    })}
                </select>

                <div>
                    {selectedCoin &&
                        <>
                            <span>{selectedCoin.name}</span>
                            <span>${selectedCoin.current_price}</span>
                            <span>{userCoins[coinIndex] && `You have ${userCoins[coinIndex].amt} coins @ $${selectedCoin.current_price} totaling $${(userCoins[coinIndex].amt * selectedCoin.current_price).toFixed(2)}`}</span>
                        </>
                    }

                    <label htmlFor="bsAmount">Amount:</label>
                    <input type="number" name="bsAmount" value={amt} onChange={updateAmt} min="1" required></input>
                    <button onClick={() => handleBuy()}>Buy</button>
                    <button onClick={() => handleSell()}>Sell</button>
                </div>
            </form>
        </div>
    )
}
