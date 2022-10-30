import { ref, onValue } from 'firebase/database';

import useInputState from '../hooks/useInputState';
import { useNavigate } from 'react-router-dom';

export default function Login({ database, isLoggedIn, handleLogIn }) {
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const navigate = useNavigate();

    // creates a variable that makes reference to our db
    const dbRef = ref(database, "/users");

    // takes user input for email and password, crossreferences them against all users in db, and logins/redirects if there is a match, else alerts user there is no match
    function handleSubmit(e) {
        e.preventDefault();

        onValue(dbRef, (response) => {
            const newState = []

            const data = response.val();
            for (let user in data) {
                if (email.toLowerCase() === data[user].email && password === data[user].password) {
                    newState.push(user, data[user].name, data[user].investmentAmount, data[user].cash, (data[user].coins ? data[user].coins : []));
                }
            }

            if (newState.length > 0) {
                handleLogIn(...newState)
            } else {
                alert("Email and Password do not match");
            }
            resetEmail();
            resetPassword();
        })
    }

    return (
        <>
            {isLoggedIn ? (
                <>{navigate('/')}</>
            ) : (
                <div>
                    <h2>Login Page</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" onChange={(e) => updateEmail(e)} value={email} />
                        <label>Password</label>
                        <input type="password" onChange={(e) => updatePassword(e)} value={password} />
                        <button type="submit">Log In</button>
                    </form>
                    <p>Don't have an account? Sign up today for free!</p>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            )}
        </>
    )
}