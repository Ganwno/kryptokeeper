import Coin from './Coin';
import '../styles/CoinList.css';

export default function CoinList({ coins }) {
    return (
        <div>
            <h1>I am a coin list</h1>
            <div className="CoinList-container">
                {coins.map((coin) => {
                    return <Coin key={coin.symbol} coin={coin} />
                })}
            </div>
        </div>
    )
}