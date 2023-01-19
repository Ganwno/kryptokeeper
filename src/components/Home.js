import CoinList from './CoinList';
import AccountInfo from './AccountInfo';
import AboutApp from './AboutApp';

import { useUserData } from './ContextUserData';

export default function Home() {
    const userData = useUserData();
    return (
        <>
            <CoinList />
            {(userData.isLoggedIn ? <AccountInfo /> : <AboutApp />)}
        </>
    )
}