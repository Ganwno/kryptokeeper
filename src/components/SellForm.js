import { useState } from 'react';
import useInputState from '../hooks/useInputState';

export default function SellForm({ toggleSell, userCoins, sellCoin, coins }) {
    const [selectedCoin, setSelectedCoin] = useState('');
    const [amt, updateAmt, resetAmt] = useInputState(0);
    const [coinToSell, setCoinToSell] = useState(0);
    const [coinIndex, setCoinIndex] = useState();

    // changes occurring when manipulating dropdown
    function handleChange(e) {
        // updates value to whichever coin selected
        setSelectedCoin(e.target.value);
        // finds index of selected coin from user's coin wallet to gain access to the amt they own
        let targetCoin = userCoins.findIndex((coin) => coin.name === e.target.value);
        setCoinIndex(targetCoin);
        // finds index of the selected coin to extract price from the original coin list
        const targetIndex = coins.findIndex((coin => coin.name === e.target.value))
        setCoinToSell(coins[targetIndex]);
        // clears amount to sell when coin changes
        resetAmt();
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSelectedCoin('null');
        toggleSell();
        sellCoin(parseInt(amt), coinToSell);
    }

    return (
        <>
            <h2>Sell dem coins</h2>
            <form onSubmit={handleSubmit}>
                <label>Stock to sell:</label>
                {/* populates dropdown list with variety of coins */}
                <select onChange={(e) => handleChange(e)} data-dropup-auto="false" value={selectedCoin}>
                    <option value="" disabled>Please Select Coin</option>
                    {userCoins.map((coin) => {
                        if (coin) {
                            return <option key={coin.name} value={coin.name}>{coin.name}</option>
                        } else return '';
                    })}
                </select>
                {
                    /* only renders when user selects coin from dropdown list */
                    (coinIndex >= 0) &&
                    <div>
                        <span>{userCoins[coinIndex].name}</span>
                        <span>{coinToSell && `You have ${userCoins[coinIndex].amt} coins @ $${coinToSell.current_price} totaling $${(userCoins[coinIndex].amt * coinToSell.current_price).toFixed(2)}`}</span>
                        <label>Amount you wish to sell:</label>
                        <input type="number" onChange={updateAmt} value={amt} min="1" required></input>
                        <button type="submit">Sell</button>
                    </div>
                }
            </form>
            {/*cancels the form and returns to Portfolio*/}
            <button onClick={() => toggleSell()}>Cancel</button>
        </>
    )
}