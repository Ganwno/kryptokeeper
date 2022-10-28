import '../styles/Coin.css';

export default function Coin({coin}) {
    return (
        <div className="Coin-card">
            <img src={coin.image} alt={coin.name}/>
            <span>{coin.symbol}</span>
        </div>
    )
}