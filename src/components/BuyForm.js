import { useState } from 'react';

import '../styles/BuyForm.css';

export default function BuyForm({ coins, userMoney, purchaseCoin, setBuy, trade }) {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [buyAmount, setBuyAmount] = useState(0);

    function handleChange(e) {
        let selectCoin = coins.filter((coin) => {
            return coin.name === e.target.value;
        })
        setSelectedCoin(...selectCoin)
    }

    function handleBuyAmount(e) {
        setBuyAmount(e.target.value)
    }

    // when submits form to purchase, checks if amount is greater than 0 before committing to purchase
    function handleSubmit(e) {
        e.preventDefault();
        (buyAmount > 0 && purchaseCoin(buyAmount, selectedCoin));
        setBuyAmount(0);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Stock to purchase:</label>
            {/* populates dropdown list with variety of coins */}
            <select onChange={(e) => handleChange(e)} data-dropup-auto="false" defaultValue="null">
                <option value="null" disabled>Please select a coin</option>
                {coins.map((coin) => {
                    return <option key={coin.name}>{coin.name}</option>
                })}
            </select>
            {
                selectedCoin &&
                <div>
                    <span>{selectedCoin.name}</span>
                    <span>${selectedCoin.current_price}</span>
                    <label>Amount you wish to purchase:</label>
                    <input type="number" onChange={handleBuyAmount} value={buyAmount} min="1" required></input>
                    <button type="submit">Purchase</button>
                </div>
            }
            {/*cancels the form and returns to Portfolio*/}
            <button onClick={() => (setBuy(false), trade(false))}>Cancel</button>
        </form>
    )
}