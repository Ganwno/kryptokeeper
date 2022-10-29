import firebaseConfig from '../firebase';
import { useState } from 'react';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';

export default function Login({ handleLogIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // creates variable that holds our db values
    const database = getDatabase(firebaseConfig);
    // creates a variable that makes reference to our db
    const dbRef = ref(database, "/users");

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        onValue(dbRef, (response) => {
            const newState = []

            const data = response.val();
            for (let user in data) {
                if (email === data[user].email && password === data[user].password) {
                    handleLogIn();
                } else {
                    alert("Email and Password do not match");
                }
            }
        })
    }

    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <label>email</label>
                <input type="email" onChange={(e) => handleEmail(e)}></input>
                <label>password</label>
                <input type="password" onChange={(e) => handlePassword(e)}></input>
                <button type="submit" >Log In</button>
            </form>
            
        </div>
    )
}