import caretUp from '../assets/images/caret-up-solid.svg';
import caretDown from '../assets/images/caret-down-solid.svg';

export default function CoinPriceChange({ period, priceChange }) {
    // adds price information depending on time period (1h, 24h, 7d), will add classes & svg (arrow) dynamically depending on whether the number is positive/negative, also changes number to absolute for formatting and the icon is indicative of gain or loss
    return (
        <div className="Coin-coinPrice">
            <span className="Coin-timePeriod">{period}:</span>
            <span className={priceChange >= 0 ? "Coin-coinPriceAmt positive" : "Coin-coinPriceAmt negative"}>
                {priceChange !== 0 &&
                    <img
                        src={priceChange > 0 ? caretUp : caretDown}
                        alt="arrow up"
                        className={`Coin-arrow ${priceChange > 0 ? "Coin-arrowUp" : "Coin-arrowDown"}`}
                    />}
                {priceChange ? `${Math.abs(priceChange).toFixed(2)}%` : <span className="Coin-na">N/A</span>}
            </span>
        </div>
    )
}