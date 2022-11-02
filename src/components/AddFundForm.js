import useInputState from '../hooks/useInputState';

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
                <div>
                    <button type="submit" className="button AddFund-button">+</button>
                    <button onClick={() => toggleAddFunds()} className="button AddFund-button">Cancel</button>
                </div>
            </form>
        </>
    )
}