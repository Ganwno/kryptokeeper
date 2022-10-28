import '../styles/Navbar.css';

export default function Navbar({isLoggedIn, handleLogIn}) {
    return (
        <header>
            <nav className="Navbar">
                <h1>Krypto King</h1>
                <button onClick={handleLogIn}>{isLoggedIn ? 'Log Out' : 'Log In'}</button>
            </nav>
        </header>
    )
}