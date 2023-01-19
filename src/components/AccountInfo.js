import { useState, useEffect } from 'react';
import AddFundForm from './AddFundForm';
import { useNavigate } from 'react-router-dom';
import useToggleState from '../hooks/useToggleState';

import { useCoinData } from './ContextCoinData';
import { useUserData } from './ContextUserData';

export default function AccountInfo({ coinsAmt, addFunds }) {
    const navigate = useNavigate();
    const coins = useCoinData();
    const userData = useUserData();
    const [gross, setGross] = useState();
    const netWorth = ((userData.money + gross - userData.investment).toFixed(2));
    const [addingFunds, toggle] = useToggleState();

    // this calculates user's gross worth incl cash on hand & coin value
    useEffect(() => {
        if (userData.coins.length > 0) {
            const amounts = userData.coins.map((coin) => {
                const targetIndex = coins.findIndex((stockCoin) => stockCoin.name === coin.name)
                return coin.amt * (targetIndex !== -1 ? coins[targetIndex].current_price : 0);
            });
            let total = 0;
            for (let i = 0; i < amounts.length; i++) {
                total = total + amounts[i];
            }
            setGross(parseFloat(total.toFixed(2)));
        } else {
            setGross(0);
        }
    }, [coins, userData.coins]);

    return (
        <section className="AccountInfo">
            <span className="AccountInfo-welcome">Welcome back, {userData.name}!</span>

            <h2>Account Info</h2>
            <ul>
                <li className="AccountInfo-item">
                    <span>Initial Investment: ${userData.investment}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Available Funds: ${userData.money}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Coin Value: ${coinsAmt}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Net Worth:</span>
                    <span className={Math.abs(netWorth) !== 0 && `${netWorth > 0 ? "AccountInfo-gain" : "AccountInfo-loss"}`}> ${netWorth}</span>
                </li>
            </ul>

            <button className="button AccountInfo-button" onClick={() => navigate('/portfolio')}>Trade</button>
            {
                addingFunds ? (
                    <AddFundForm addFunds={addFunds} toggleAddFunds={toggle} />
                ) : (
                    <>
                        <button className="button AccountInfo-button" onClick={() => toggle()}>Add funds</button>
                    </>
                )
            }
        </section>
    )
}