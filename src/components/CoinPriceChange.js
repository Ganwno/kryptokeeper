import caretUp from '../assets/images/caret-up-solid.svg';
import caretDown from '../assets/images/caret-down-solid.svg';

export default function CoinPriceChange({ period, priceChange }) {
    return (
        <p className="Coin-coinPrice">

            <span className="Coin-timePeriod">{period}:</span>
            <span className={priceChange >= 0 ? "Coin-coinPriceGain" : "Coin-coinPriceLoss"}>
                {priceChange !== 0 &&
                    <img
                        src={priceChange > 0 ? caretUp : caretDown}
                        alt="arrow up"
                        className={`Coin-arrow ${priceChange > 0 ? "Coin-arrowUp " : "Coin-arrowDown"}`}
                    />}
                ${Math.abs(priceChange.toFixed(2))}
            </span>
        </p>
    )
}