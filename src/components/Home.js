import CoinList from './CoinList';
import AccountInfo from './AccountInfo';
import AboutApp from './AboutApp';

export default function Home({ name, coins, coinsAmt, isLoggedIn, investment, userMoney, userCoins }) {
    return (
        <>
            <CoinList coins={coins} />
            {
                (isLoggedIn ?
                    <AccountInfo
                        name={name}
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