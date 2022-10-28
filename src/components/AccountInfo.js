import { useNavigate } from 'react-router-dom';

export default function AccountInfo({ userMoney, displayUserInfo }) {
    const navigate = useNavigate();

    return (
        <>
            <h2>Account Info</h2>
            <span>Initial Investment: {userMoney}</span>
            <span>Net Worth: {userMoney - userMoney}</span>
            <button onClick={() => navigate('/portfolio')}>Go to Portfolio</button>
        </>
    )
}