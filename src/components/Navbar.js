import { Link, useNavigate } from 'react-router-dom';
export default function Navbar({ isLoggedIn, handleLogOut }) {
    const navigate = useNavigate();
    const handleClick = () => !isLoggedIn ? navigate('/login') : handleLogOut();

    return (
        <header className="Navbar-header">
            <nav className="Navbar">
                <Link to="/"><h1>Krypto King</h1></Link>
                <Link to={isLoggedIn ? '/logout' : '/login'} className="Navbar-loginButton">{isLoggedIn ? 'Log Out' : 'Log In'}</Link>
                {/* <button className="button Navbar-loginButton" onClick={handleClick}>{isLoggedIn ? 'Log Out' : 'Log In'}</button> */}
            </nav>
        </header>
    )
}