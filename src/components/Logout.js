import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateUserData } from './ContextUserData';

export default function Logout() {
    const navigate = useNavigate();
    const updateUserData = useUpdateUserData();
    
    useEffect(() => {
        setTimeout(function () {
            if (window.location.pathname === "/logout") {
                navigate('/')
            }
        }, 5000);
        updateUserData("LOGOUT");
    }, [])

    return (
        <div className="posY">
            <div className="fittedCard">
                <h2>Thank you for using Kryptokeeper!</h2>
                <p>You have been logged out.</p><p>You should be redirected in 5 seconds.</p>
            </div>
        </div>
    )
}