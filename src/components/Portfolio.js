import { Navigate } from 'react-router-dom';

import BuySell from './BuySell';

export default function Portfolio({ isLoggedIn, coins, userMoney, userCoins, purchaseCoin, sellCoin }) {

    // only renders if user is logged in
    return (
        // <div className="posY">
        //     {
        //         isLoggedIn ? (
                    <BuySell
                        userMoney={userMoney}
                        purchaseCoin={purchaseCoin}
                        sellCoin={sellCoin}
                        coins={coins}
                        userCoins={userCoins}
                    />
    //             ) : (
    //                 <Navigate to="/" />
    //             )
    //         }
    //     </div>
    )
}