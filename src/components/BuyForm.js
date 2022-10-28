import { useState } from 'react';

import '../styles/BuyForm.css';

export default function BuyForm({ coins, purchaseCoin, setBuy, trade }) {
    const [selectedCoin, setSelectedCoin] = useState('');

    function handleChange(e) {
        let selectCoin = coins.filter((coin) => {
            return coin.name === e.target.value;
        })
        setSelectedCoin(...selectCoin)
    }

    return (
        <form onSubmit={purchaseCoin}>
            <label>Stock to purchase:</label>
            {/* populates dropdown list with variety of coins */}
            <select onChange={(e) => handleChange(e)} data-dropup-auto="false">
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
                    <input type="number" required></input>
                    <button type="submit">Purchase</button>
                    
                </div>
            }
            <button onClick={() => (setBuy(false), trade(false))}>Back</button>
        </form>
    )
}