import { Link } from 'react-router-dom';
export default function Navbar({ isLoggedIn }) {
    return (
        <header className="Navbar-header">
            <nav className="Navbar">
                <Link to="/"><h1>Krypto King</h1></Link>
                <Link to={isLoggedIn ? '/logout' : '/login'} className="Navbar-loginButton">{isLoggedIn ? 'Log Out' : 'Log In'}</Link>
            </nav>
        </header>
    )
}