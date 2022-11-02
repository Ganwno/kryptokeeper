import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import Coin from './Coin';

export default function CoinList({ coins }) {
    const responsive = {
        0: { items: 3 },
        600: { items: 4 },
        840: { items: 6 },
        1024: { items: 8 }
    }
    const items = coins.map((coin) => {
        return <Coin key={coin.symbol} coin={coin} />
    })

    return (
        <div className="CoinList-container">
            <AliceCarousel
                mouseTracking items={items}
                responsive={responsive}
                autoPlay={true}
                autoPlayInterval={1}
                animationDuration={3500}
                animationEasingFunction={"linear"}
                disableButtonsControls={true}
                disableDotsControls={true}
            />
        </div>
    )
}