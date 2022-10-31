import { useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, handleLogOut }) {
    const navigate = useNavigate();
    const  handleClick = () => !isLoggedIn ? navigate('/login') : handleLogOut();

    return (
        <header className="Navbar-header">
            <nav className="Navbar">
                <h1 onClick={() => navigate('/')}>Krypto King</h1>
                <button className="button Navbar-loginButton" onClick={handleClick}>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
            </nav>
        </header>
    )
}