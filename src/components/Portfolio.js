import { useNavigate } from 'react-router-dom';

export default function Portfolio({coins}) {
    const navigate = useNavigate();

    return (
        <>
            <h2>Hi I'm a portfolio</h2>
            <button onClick={() => navigate("/")}>Go back</button>
            <button>Buy</button>
            <button>Sell</button>
        </>
    )
}