import { useState } from 'react';
import useInputState from '../hooks/useInputState';

import '../styles/BuyForm.css';

export default function BuyForm({ coins, purchaseCoin, toggleBuy }) {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [amt, updateAmt, resetAmt] = useInputState(0);

    function handleChange(e) {
        let selectCoin = coins.filter((coin) => {
            return coin.name === e.target.value;
        })
        setSelectedCoin(...selectCoin)
    }

    // when submits form to purchase, checks if amount is greater than 0 before committing to purchase
    function handleSubmit(e) {
        e.preventDefault();
        (amt > 0 && purchaseCoin(amt, selectedCoin));
        resetAmt();
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
                    <input type="number" value={amt} onChange={updateAmt}  min="1" required></input>
                    <button type="submit">Purchase</button>
                </div>
            }
            {/*cancels the form and returns to Portfolio*/}
            <button onClick={() => toggleBuy()}>Cancel</button>
        </form>
    )
}