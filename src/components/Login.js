import { ref, onValue } from 'firebase/database';
import useInputState from '../hooks/useInputState';
import { useNavigate } from 'react-router-dom';

import { useUserData, useUpdateUserData } from './ContextUserData';
import { fetchDatabase } from '../utils/database';

import BackButton from './BackButton';
import { useEffect } from 'react';

export default function Login() {
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const navigate = useNavigate();
    const database = fetchDatabase();

    const userData = useUserData();
    const updateUserData = useUpdateUserData();
    const dbRef = ref(database, "/users");

    useEffect(() => {
        if (userData.isLoggedIn === true) {
            navigate('/');
        }
    }, [userData, navigate])

    // takes user input for email and password, crossreferences them against all users in db, and logins/redirects if there is a match, else alerts user there is no match
    function handleSubmit(e) {
        e.preventDefault();

        onValue(dbRef, (response) => {
            let newState = {};

            const data = response.val();
            for (let user in data) {
                if (email.toLowerCase() === data[user].email && password === data[user].password) {
                    newState = {
                        id: user,
                        name: data[user].name,
                        investment: data[user].investmentAmount,
                        money: data[user].cash,
                        coins: data[user].coins
                    }
                }
            }

            console.log(newState)

            if (newState.name.length > 0) {
                updateUserData("LOGIN", newState)
            } else {
                alert("Email and Password do not match");
            }
        })
        resetEmail();
        resetPassword();
    }

    return (
        <div className="posY">
            <div className="formCard">
                <BackButton destination="/" />
                <h2 className="accent">Login Page</h2>
                <form onSubmit={handleSubmit} className="form">
                    <label htmlFor="email" value="email" />
                    <input name="email" type="email" className="formInput" placeholder="Email" onChange={(e) => updateEmail(e)} value={email} />
                    <label htmlFor="password" value="password" />
                    <input type="password" className="formInput" placeholder="Password" onChange={(e) => updatePassword(e)} value={password} />
                    <button type="submit" className="button formButton bgAccent">Log In</button>
                </form>
                <p>Don't have an account? Sign up today for free!</p>
                <button onClick={() => navigate('/register')} className="button formButton bgAccent">Register</button>
            </div>
        </div>
    )
}