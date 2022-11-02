import AddFundForm from './AddFundForm';
import { useNavigate } from 'react-router-dom';
import useToggleState from '../hooks/useToggleState';

export default function AccountInfo({ name, coinsAmt, userMoney, investment, addFunds }) {
    const navigate = useNavigate();
    const netWorth = ((userMoney + coinsAmt - investment).toFixed(2));
    const [addingFunds, toggle] = useToggleState();

    return (
        <section className="AccountInfo">
            <span className="AccountInfo-welcome">Welcome back, {name}!</span>

            <h2>Account Info</h2>
            <ul>
                <li className="AccountInfo-item">
                    <span>Initial Investment: ${investment}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Available Funds: ${userMoney}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Coin Value: ${coinsAmt}</span>
                </li>
                <li className="AccountInfo-item">
                    <span>Net Worth:</span>
                    <span className={Math.abs(netWorth) !== 0 && `${netWorth > 0 ? "AccountInfo-gain" : "AccountInfo-loss"}`}> ${netWorth}</span>
                </li>
            </ul>

            <button className="button AccountInfo-button" onClick={() => navigate('/portfolio')}>Trade</button>
            {
                addingFunds ? (
                    <AddFundForm addFunds={addFunds} toggleAddFunds={toggle} />
                ) : (
                    <>
                        <button className="button AccountInfo-button" onClick={() => toggle()}>Add funds</button>
                    </>
                )
            }
        </section>
    )
}