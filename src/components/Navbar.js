import { useNavigate } from 'react-router-dom';

import '../styles/Navbar.css';

export default function Navbar({ isLoggedIn, handleLogOut }) {
    const navigate = useNavigate();
    function handleClick() {
        {!isLoggedIn ? navigate('/login') : handleLogOut()};
    }

    return (
        <header>
            <nav className="Navbar">
                <h1>Krypto King</h1>
                <button onClick={handleClick}>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
            </nav>
        </header>
    )
}