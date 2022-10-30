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
            }}
                style={{ margin: '0 1rem', width: '100%' }} // brings edit field in line with todo styles
            >
                <input type="number" value={value} onChange={handleChange} />
            </form>
            <button onClick={() => toggleAddFunds()}>Cancel</button>
        </>
    )
}