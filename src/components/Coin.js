import CoinPriceChange from './CoinPriceChange';

export default function Coin({ coin }) {
    return (
            <div className="Coin-card">
                <img src={coin.image} className="Coin-coinImg" alt={coin.name} />
                <span className="Coin-coinName">{coin.symbol.toUpperCase()}</span>
                <span>${coin.current_price}</span>

                <CoinPriceChange period="1h" priceChange={coin.price_change_percentage_1h_in_currency} />

                <CoinPriceChange period="24h" priceChange={coin.price_change_percentage_24h_in_currency} />
                    
                <CoinPriceChange period="7d" priceChange={coin.price_change_percentage_7d_in_currency} />
            </div>
    )
}

