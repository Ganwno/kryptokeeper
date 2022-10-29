import CoinList from './CoinList';
import AccountInfo from './AccountInfo';
import AboutApp from './AboutApp';

export default function Home({ coins, coinsAmt, isLoggedIn, investment, userMoney, userCoins }) {
    return (
        <>
            <CoinList coins={coins} />
            {
                (isLoggedIn ?
                    <AccountInfo
                        investment={investment}
                        userMoney={userMoney}
                        coinsAmt={coinsAmt}
                        userCoins={userCoins}
                    />
                    :
                    <AboutApp />
                )
            }
        </>
    )
}