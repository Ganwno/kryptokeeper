import useInputState from '../hooks/useInputState';

import plus from '../assets/images/plus-solid.svg';
import cancel from '../assets/images/xmark-solid.svg';

export default function AddFundForm({ addFunds, toggleAddFunds }) {
    const [value, handleChange, reset] = useInputState(0)
    return (
        // when form is submitted, we prevent refreshing the page, call the addFunds function, then clear the form
        <>
            <form onSubmit={e => {
                e.preventDefault();
                addFunds(parseInt(value));
                reset();
                toggleAddFunds();
            }} >
                <input type="number" value={value} className="AddFund-input" onChange={handleChange} />
                <div className="AddFund-buttonContainer">
                    <button type="submit" className="button AddFund-button bgPositive"><img src={plus} className="fundsIcon" alt="add funds"/></button>
                    <button onClick={() => toggleAddFunds()} className="button AddFund-button bgNegative"><img src={cancel} className="fundsIcon" alt="cancel" /></button>
                </div>
            </form>
        </>
    )
}