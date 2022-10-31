import CoinPriceChange from './CoinPriceChange';

export default function Coin({ coin }) {
    return (
        <div className="Coin-container">
            <div className="Coin-card">
                <img src={coin.image} alt={coin.name} />
                <span className="Coin-coinName">{coin.symbol}</span>
                <span>${coin.current_price}</span>

                <CoinPriceChange period="1h" priceChange={coin.price_change_percentage_1h_in_currency} />

                <CoinPriceChange period="24h" priceChange={coin.price_change_percentage_24h_in_currency} />
                    
                <CoinPriceChange period="1d" priceChange={coin.price_change_percentage_7d_in_currency} />
                {/* <p className="Coin-coinPrice">24h :
                    <span className={coin.price_change_percentage_24h_in_currency >= 0 ? "Coin-coinPriceGain" : "Coin-coinPriceLoss"}>
                        ${Math.abs(coin.price_change_percentage_24h_in_currency.toFixed(2))}
                    </span>
                </p>
                <p className="Coin-coinPrice">7d :
                    <span className={coin.price_change_percentage_7d_in_currency >= 0 ? "Coin-coinPriceGain" : "Coin-coinPriceLoss"}>
                        ${Math.abs(coin.price_change_percentage_7d_in_currency.toFixed(2))}
                    </span>
                </p> */}
            </div>
        </div>
    )
}

