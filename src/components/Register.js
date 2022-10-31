import RegisterForm from './RegisterForm';

export default function Register({ isLoggedIn, database }) {

    return (
        <>
            {isLoggedIn ? (
                <h1>I'm a register</h1>
            ) : (
                <RegisterForm
                    database={database}
                />
            )}
        </>
    )
}