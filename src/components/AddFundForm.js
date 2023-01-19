import useInputState from '../hooks/useInputState';
import { useUserData, useUpdateUserData } from './ContextUserData';

import plus from '../assets/images/plus-solid.svg';
import cancel from '../assets/images/xmark-solid.svg';

export default function AddFundForm({ toggleAddFunds }) {
    const [value, handleChange, reset] = useInputState(0)
    const userData = useUserData();
    const updateUserData = useUpdateUserData();

    function handleSubmit(e) {
        e.preventDefault();
        if (parseInt(value) < 0 && Math.abs(parseInt(value)) > userData.money) {
            alert('Cannot remove a sum greater than current available funds.')
        } else {
            updateUserData('INVESTMENT', parseInt(value))
            reset();
            toggleAddFunds();
        }
    }
    return (
        // when form is submitted, we prevent refreshing the page, call the addFunds function, then clear the form
        <>
            <form onSubmit={e => handleSubmit(e)} >
                <input type="number" value={value} className="AddFund-input" onChange={handleChange} />
                <div className="AddFund-buttonContainer">
                    <button type="submit" className="button AddFund-button bgPositive"><img src={plus} className="fundsIcon" alt="add funds" /></button>
                    <button onClick={() => toggleAddFunds()} className="button AddFund-button bgNegative"><img src={cancel} className="fundsIcon" alt="cancel" /></button>
                </div>
            </form>
        </>
    )
}