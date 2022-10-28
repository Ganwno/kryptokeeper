import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BuyForm from './BuyForm';


export default function Portfolio({ coins, userMoney, purchaseCoin }) {
    const navigate = useNavigate();
    const [tradeHappening, setTradeHappening] = useState(false);
    const [buy, setBuy] = useState(false);

    return (
        <>
            <h2>Hi I'm a portfolio</h2>
            <button onClick={() => navigate("/")}>Go back</button>
            {!tradeHappening &&
                <>
                    <button onClick={() => (setBuy(!buy), setTradeHappening(true))}>Buy</button>
                    <button>Sell</button>
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
        </>
    )
}