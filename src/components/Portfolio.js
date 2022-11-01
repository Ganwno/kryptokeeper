import { useNavigate } from 'react-router-dom';

import BuySell from './BuySell';

export default function Portfolio({ isLoggedIn, coins, userMoney, userCoins, purchaseCoin, sellCoin }) {
    const navigate = useNavigate();

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