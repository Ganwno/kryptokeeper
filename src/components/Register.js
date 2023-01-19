import { Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { useUserData } from './ContextUserData';

export default function Register({ database }) {
    const userData = useUserData();
    return (
        <div className="posY">
            {userData.isLoggedIn ? (
                <Navigate to="/" />
            ) : (
                <RegisterForm
                    database={database}
                />
            )}
        </div>
    )
}