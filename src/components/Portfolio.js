import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BuyForm from './BuyForm';
import SellForm from './SellForm';

export default function Portfolio({ coins, userMoney, userCoins, purchaseCoin, sellCoin }) {
    const navigate = useNavigate();
    const [tradeHappening, setTradeHappening] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);

    return (
        <>
            <h2>Portfolio</h2>
            <button onClick={() => navigate("/")}>Go back</button>

            {!tradeHappening &&
                <>
                    <button onClick={() => (setBuy(true), setTradeHappening(true))}>Buy</button>
                    {/* sell button is only available if the user has coins */}
                    {userCoins.length > 0 && <button onClick={() => (setSell(true), setTradeHappening(true))}>Sell</button>}
                </>
            }

            {/* activates buy component only if the buy button is pressed*/}
            {buy &&
                <BuyForm
                    setBuy={setBuy}
                    userMoney={userMoney}
                    trade={setTradeHappening}
                    purchaseCoin={purchaseCoin}
                    coins={coins}
                />
            }

            {/* activates sell component only if the sell button is pressed */}
            {sell &&
                <SellForm
                    setSell={setSell}
                    trade={setTradeHappening}
                    userCoins={userCoins}
                    sellCoin={sellCoin}
                    coins={coins}
                />
            }
        </>
    )
}