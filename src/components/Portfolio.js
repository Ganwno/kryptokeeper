import { useNavigate } from 'react-router-dom';

import BuyForm from './BuyForm';
import SellForm from './SellForm';
import BuySell from './BuySell';

import useToggleState from '../hooks/useToggleState';

export default function Portfolio({ isLoggedIn, coins, userMoney, userCoins, purchaseCoin, sellCoin }) {
    const navigate = useNavigate();
    const [buy, toggleBuy] = useToggleState();
    const [sell, toggleSell] = useToggleState();

    // only renders if user is logged in
    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <h2>Portfolio</h2>
                        <button onClick={() => navigate("/")}>Go back</button>
                        <BuySell
                            userMoney={userMoney}
                            purchaseCoin={purchaseCoin}
                            sellCoin={sellCoin}
                            coins={coins}
                            userCoins={userCoins}
                        />

                    </>
                ) : (
                    <>
                        {navigate('/')}
                    </>
                )
            }
        </>
    )
}