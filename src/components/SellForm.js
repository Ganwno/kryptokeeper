import { useState } from 'react';

export default function SellForm({ setSell, trade, userCoins, sellCoin, coins }) {
    const [selectedCoin, setSelectedCoin] = useState('null');
    const [sellAmount, setSellAmount] = useState(0);
    const [coinToSell, setCoinToSell] = useState(0);
    const [coinIndex, setCoinIndex] = useState();

    function handleSubmit(e) {
        e.preventDefault();
        setSelectedCoin('null');
        setSell(false);
        trade(false);
        sellCoin(sellAmount, coinToSell);
        
       
    }

    // changes occurring when manipulating dropdown
    function handleChange(e) {
        // updates value to whichever coin selected
        setSelectedCoin(e.target.value);

        let targetCoin = userCoins.findIndex((coin) => coin.name === e.target.value);
        setCoinIndex(targetCoin);
        // finds index of the selected coin to extract price from the original coin list
        const targetIndex = coins.findIndex((coin => coin.name === e.target.value))
        setCoinToSell(coins[targetIndex]);
        console.log(coinToSell);
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
                <select onChange={(e) => handleChange(e)} data-dropup-auto="false" value={selectedCoin}>
                    <option value="null" disabled>Please Select Coin</option>
                    {userCoins.map((coin) => {
                        if (coin) {
                            return <option key={coin.name} value={coin.name}>{coin.name}</option>
                        }
                        
                    })}
                </select>
                {
                    /* only renders when user selects coin from dropdown list */
                    (coinIndex >= 0) &&
                    <div>
                        <span>{userCoins[coinIndex].name}</span>
                        <span>{coinToSell && `You have ${userCoins[coinIndex].amt} coins @ $${coinToSell.current_price} totaling $${userCoins[coinIndex].amt * coinToSell.current_price}`}</span>
                        <label>Amount you wish to sell:</label>
                        <input type="number" onChange={handleSellAmount} value={sellAmount} min="1" required></input>
                        <button type="submit">Sell</button>
                    </div>
                }
            </form>
            {/*cancels the form and returns to Portfolio*/}
            <button onClick={() => (setSell(false), trade(false))}>Cancel</button>
        </>
    )
}