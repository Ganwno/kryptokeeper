import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout({ handleLogOut }) {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(function () {
            if (window.location.pathname === "/logout") {
                navigate('/')
            }
        }, 5000);
        handleLogOut();
    }, [handleLogOut, navigate])

    return (
        <div className="posY">
            <div className="fittedCard">
                <h2>Thank you for using Krypto King</h2>
                <p>You have been logged out.</p><p>You should be redirected in 5 seconds.</p>
            </div>
        </div>
    )
}