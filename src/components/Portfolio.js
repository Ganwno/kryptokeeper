import { useNavigate } from 'react-router-dom';

import BuyForm from './BuyForm';
import SellForm from './SellForm';

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

                        {(!buy && !sell) &&
                            <>
                                <button onClick={() => toggleBuy()}>Buy</button>
                                {/* sell button is only available if the user has coins */}
                                {userCoins.length > 0 && <button onClick={() => toggleSell()}>Sell</button>}
                            </>
                        }

                        {/* activates buy component only if the buy button is pressed*/}
                        {buy &&
                            <BuyForm
                                toggleBuy={toggleBuy}
                                userMoney={userMoney}
                                purchaseCoin={purchaseCoin}
                                coins={coins}
                            />
                        }

                        {/* activates sell component only if the sell button is pressed */}
                        {sell &&
                            <SellForm
                                toggleSell={toggleSell}
                                userCoins={userCoins}
                                sellCoin={sellCoin}
                                coins={coins}
                            />
                        }
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