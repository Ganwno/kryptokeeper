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