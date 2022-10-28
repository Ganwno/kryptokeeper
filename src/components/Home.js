import CoinList from './CoinList';
import AccountInfo from './AccountInfo';
import AboutApp from './AboutApp';

export default function Home({ coins, isLoggedIn, displayUserInfo, userMoney }) {
    return (
        <>
            <CoinList coins={coins} />
            {
                (isLoggedIn ?
                    <AccountInfo
                        displayUserInfo={displayUserInfo}
                        userMoney={userMoney}
                    />
                    :
                    <AboutApp />
                )
            }
        </>
    )
}