import Coin from './Coin';

export default function CoinList({ coins }) {
    return (
        <div>
            <div className="CoinList-container">
                {coins.map((coin) => {
                    return <Coin key={coin.symbol} coin={coin} />
                })}
            </div>
        </div>
    )
}