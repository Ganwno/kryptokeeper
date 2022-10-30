import firebaseConfig from '../firebase';
import { useState } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';

import useInputState from '../hooks/useInputState';

export default function Login({ handleLogIn }) {
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    // creates variable that holds our db values
    const database = getDatabase(firebaseConfig);
    // creates a variable that makes reference to our db
    const dbRef = ref(database, "/users");

    // takes user input for email and password, crossreferences them against all users in db, and logins/redirects if there is a match, else alerts user there is no match
    function handleSubmit(e) {
        e.preventDefault();
        
        onValue(dbRef, (response) => {
            const newState = []

            const data = response.val();
            for (let user in data) {
                if (email === data[user].email && password === data[user].password) {
                    newState.push(data[user].email, data[user].name, data[user].investmentAmount, data[user].cash, (data[user].coins ? data[user].coins : []));
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
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" onChange={(e) => updateEmail(e)} value={email}/>
                <label>Password</label>
                <input type="password" onChange={(e) => updatePassword(e)} value={password}/>
                <button type="submit">Log In</button>
            </form>            
        </div>
    )
}