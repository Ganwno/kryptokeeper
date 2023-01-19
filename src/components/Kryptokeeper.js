// modules
import { Routes, Route } from 'react-router-dom';
import firebaseConfig from '../firebase';
import { getDatabase } from 'firebase/database';

import { UserDataProvider } from './ContextUserData';
import { CoinDataProvider } from './ContextCoinData';

// components
import Navbar from './Navbar';
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import Portfolio from './Portfolio';
import Register from './Register';
import Footer from './Footer';
import ErrorPage from './ErrorPage';


export default function Kryptokeeper() {
    const database = getDatabase(firebaseConfig);

    return (
        <>
            <CoinDataProvider>
                <UserDataProvider >
                    <Navbar />
                    <div className="App-body">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login"
                                element={<Login
                                    database={database}
                                />}
                            />
                            <Route path="/logout" element={<Logout />} />
                            <Route path="/register"
                                element={<Register
                                    database={database}
                                />}
                            />
                            <Route path="/portfolio"
                                element={<Portfolio />}
                            />
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </div>
                </UserDataProvider>
            </CoinDataProvider>
            <Footer />
        </>
    );
}