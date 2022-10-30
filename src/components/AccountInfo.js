import { useNavigate } from 'react-router-dom';

export default function AccountInfo({ name, coinsAmt, userMoney, investment }) {
    const navigate = useNavigate();
    const netWorth = (userMoney + coinsAmt - investment);
    return (
        <>
        <h2>Account Info</h2>
            <span>Welcome back, {name}!</span>
            
            <span>Initial Investment: {investment}</span>
            <span>Available Funds: {userMoney}</span>
            <span>Coin Value: {coinsAmt}</span>
            <span style={{ color: netWorth < 0 ? "red" : "green" }}>Net Worth: {netWorth}</span>
            <button onClick={() => navigate('/portfolio')}>Go to Portfolio</button>
        </>
    )
}