import { useEffect } from 'react';

export default function Logout({ handleLogOut }) {
    useEffect(() => {
        handleLogOut();
    }, [])
    return (
        <div>
            <h2>Thank you for using Krypto King</h2>
            <p>You have been logged out. You should be redirected in 5 seconds.</p>
        </div>
    )
}