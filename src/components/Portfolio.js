import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BuyForm from './BuyForm';
import SellForm from './SellForm';
import CoinList from './CoinList';


export default function Portfolio({ coins, userMoney, userCoins, purchaseCoin }) {
    const navigate = useNavigate();
    const [tradeHappening, setTradeHappening] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);

    return (
        <>
            <h2>Hi I'm a portfolio</h2>
            <button onClick={() => navigate("/")}>Go back</button>
            <CoinList
                coins={userCoins}
            />
            {!tradeHappening &&
                <>
                    <button onClick={() => (setBuy(true), setTradeHappening(true))}>Buy</button>
                    <button onClick={() => (setSell(true), setTradeHappening(true))}>Sell</button>
                </>
            }


            {buy &&
                <BuyForm
                    setBuy={setBuy}
                    userMoney={userMoney}
                    trade={setTradeHappening}
                    purchaseCoin={purchaseCoin}
                    coins={coins}
                />
            }

            {sell &&
                <SellForm
                    setSell={setSell}
                    trade={setTradeHappening}
                    userCoins={userCoins}
                />
            }
        </>
    )
}