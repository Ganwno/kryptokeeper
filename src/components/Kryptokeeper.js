// modules
import { Routes, Route } from 'react-router-dom';
import { UserDataProvider } from './ContextUserData';
import { CoinDataProvider } from './ContextCoinData';

import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Portfolio from './Portfolio';
import Register from './Register';
import Footer from './Footer';
import ErrorPage from './ErrorPage';


export default function Kryptokeeper() {
    return (
        <>
            <CoinDataProvider>
                <UserDataProvider >
                    <Navbar />
                    <div className="App-body">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </div>
                </UserDataProvider>
            </CoinDataProvider>
            <Footer />
        </>
    );
}