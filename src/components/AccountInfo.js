import AddFundForm from './AddFundForm';
import { useNavigate } from 'react-router-dom';
import useToggleState from '../hooks/useToggleState';

export default function AccountInfo({ name, coinsAmt, userMoney, investment, addFunds }) {
    const navigate = useNavigate();
    const netWorth = ((userMoney + coinsAmt - investment).toFixed(2));
    const [addingFunds, toggle] = useToggleState();

    return (
        <>
            <h2>Account Info</h2>
            <span>Welcome back, {name}!</span>

            <span>Initial Investment: ${investment}</span>
            <span>Available Funds: ${userMoney}</span>
            <span>Coin Value: ${coinsAmt}</span>
            <span style={{ color: netWorth < 0 ? "red" : "green" }}>Net Worth: ${netWorth}</span>
            <button onClick={() => navigate('/portfolio')}>Go to Portfolio</button>
            {
                addingFunds ? (
                    <AddFundForm addFunds={addFunds} toggleAddFunds={toggle} />
                ) : (
                    <>
                        <button onClick={() => toggle()}>Add funds</button>
                    </>

                )
            }

        </>
    )
}