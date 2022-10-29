import { useState } from 'react';

export default function SellForm({ setSell, trade, userCoins, sellCoin, coins }) {
    const [selectedCoin, setSelectedCoin] = useState();
    const [sellAmount, setSellAmount] = useState(0);
    const [coinToSell, setCoinToSell] = useState(0);

    function handleSubmit(e) {
        e.preventDefault();
        sellCoin(sellAmount, coinToSell);
        setSell(false);
        trade(false);
    }

    // changes occurring when manipulating dropdown
    function handleChange(e) {
        // updates value to whichever coin selected
        let selectCoin = userCoins.filter((coin) => {
            return coin.name === e.target.value;
        })
        setSelectedCoin(...selectCoin);
        // finds index of the selected coin to extract price from the original coin list
        const targetIndex = coins.findIndex((coin => coin.name === e.target.value))
        setCoinToSell(coins[targetIndex]);
    }

    // changes occurring when inputting sell amount
    function handleSellAmount(e) {
        setSellAmount(e.target.value);
    }

    return (
        <>
            <h2>Sell dem coins</h2>
            <form onSubmit={handleSubmit}>
                <label>Stock to sell:</label>
                {/* populates dropdown list with variety of coins */}
                <select onChange={(e) => handleChange(e)} data-dropup-auto="false" defaultValue="null">
                    <option value="null" disabled>Please Select Coin</option>
                    {userCoins.map((coin) => {
                        if (coin) {
                            return <option key={coin.name} value={coin.name}>{coin.name}</option>
                        }
                        
                    })}
                </select>
                {
                    /* only renders when user selects coin from dropdown list */
                    selectedCoin &&
                    <div>
                        <span>{selectedCoin.name}</span>
                        <span>{coinToSell && `You have ${selectedCoin.amt} coins @ $${coinToSell.current_price} totaling $${selectedCoin.amt * coinToSell.current_price}`}</span>
                        <label>Amount you wish to sell:</label>
                        <input type="number" onChange={handleSellAmount} value={sellAmount} min="1" max={selectedCoin.amt * coinToSell.current_price} required></input>
                        <button type="submit">Sell</button>
                    </div>
                }
            </form>
            {/*cancels the form and returns to Portfolio*/}
            <button onClick={() => (setSell(false), trade(false))}>Cancel</button>
        </>
    )
}