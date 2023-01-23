import { Navigate } from 'react-router-dom';
import { useUserData } from './ContextUserData';
import BuySell from './BuySell';

export default function Portfolio() {
    const userData = useUserData();
    return (
        <div className="posY">
            {
                userData.isLoggedIn ? (
                    <BuySell />
                ) : (
                    <Navigate to="/" />
                )
            }
        </div>
    )
}