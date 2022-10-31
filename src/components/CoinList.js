import Coin from './Coin';

export default function CoinList({ coins }) {
    return (
        <div>
            <h2>I am a coin list</h2>
            <div className="CoinList-container">
                {coins.map((coin) => {
                    return <Coin key={coin.symbol} coin={coin} />
                })}
            </div>
        </div>
    )
}