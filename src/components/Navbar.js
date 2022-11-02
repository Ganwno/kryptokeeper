import { Link } from 'react-router-dom';
import logoutIcon from '../assets/images/right-from-bracket-solid.svg';
import loginIcon from '../assets/images/right-to-bracket-solid.svg';

export default function Navbar({ isLoggedIn }) {
    return (
        <header className="Navbar-header">
            <nav className="Navbar">
                <Link to="/"><h1>Kryptokeeper</h1></Link>
                <Link to={isLoggedIn ? '/logout' : '/login'} className="Navbar-loginButton">
                     <img src={isLoggedIn ? logoutIcon : loginIcon} className="navIcon" />
                </Link>
            </nav>
        </header>
    )
}