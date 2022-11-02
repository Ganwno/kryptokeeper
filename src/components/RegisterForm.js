import { ref, onValue, push } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import useInputState from '../hooks/useInputState';

import BackButton from './BackButton';

export default function RegisterForm({ database }) {
    const [email, updateEmail, resetEmail] = useInputState('');
    const [password, updatePassword, resetPassword] = useInputState('');
    const [name, updateName, resetName] = useInputState('');

    const navigate = useNavigate();

    const dbRef = ref(database, "/users");

    function handleSubmit(e) {
        e.preventDefault();
        let isEmailUsed;
        // checks through database to see if user email has already been registered
        onValue(dbRef, (response) => {
            const data = response.val();
            for (let user in data) {
                if (email.toLowerCase() === data[user].email) {
                    isEmailUsed = true;
                }
            }
        })
        if (isEmailUsed) {
            alert(`The email ${email} has already been registered.`);
            resetName();
            resetEmail();
            resetPassword();
        } else {
            push(dbRef, { name: name, email: email.toLowerCase(), password: password, investmentAmount: 0, cash: 0 });
            alert('Successfully registered, please log in.')
            navigate('/login');
        }
    }

    return (
        <div className="formCard">
            <BackButton destination="/login" />
            <h2 className="accent" >Register Form</h2>
            <form onSubmit={(e) => handleSubmit(e)} className="form">
                <input type="name" placeholder="Name" className="formInput" value={name} onChange={updateName} required />
                <input type="email" placeholder="Email" className="formInput" value={email} onChange={updateEmail} required />
                <input type="password" placeholder="Password" className="formInput" value={password} onChange={updatePassword} required />
                <button type="submit" className="button formButton bgAccent">Sign Up</button>
            </form>
        </div>
    )
}