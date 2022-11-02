import { Navigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

export default function Register({ isLoggedIn, database }) {

    return (
        <div className="posY">
            {isLoggedIn ? (
                <Navigate to="/" />
            ) : (
                <RegisterForm
                    database={database}
                />
            )}
        </div>
    )
}