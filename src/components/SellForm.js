

export default function SellForm({setSell, trade}) {

    return (
        <>
            <h2>I'm a sell form</h2>

            <button onClick={() => (setSell(false), trade(false))}>Cancel</button>
        </>
    )
}