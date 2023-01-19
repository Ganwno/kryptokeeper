import { Link } from 'react-router-dom';
import { useUserData} from './ContextUserData';

import logoutIcon from '../assets/images/right-from-bracket-solid.svg';
import loginIcon from '../assets/images/right-to-bracket-solid.svg';

export default function Navbar() {
    const userData = useUserData();

    return (
        <header className="Navbar-header">
            <nav className="Navbar">
                <Link to="/"><h1>Kryptokeeper</h1></Link>
                <Link to={userData.isLoggedIn ? '/logout' : '/login'} className="Navbar-loginButton">
                     <img src={userData.isLoggedIn ? logoutIcon : loginIcon} className="navIcon" alt="Log In & Out Button" />
                </Link>
            </nav>
        </header>
    )
}