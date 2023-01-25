import coingecko from '../assets/images/coin-gecko.svg';

export default function Footer() {
    return (
        <footer className="Footer">
            <span>Created by <a href="https://github.com/klukreativ">Karl Lu</a> at <a href="https://junocollege.com">Juno College</a> 2022. </span>
            <span className="Footer-secondLine">Powered by <a href="https://coingecko.com"><img src={coingecko} className="logoCoinGecko" alt="Coin Gecko" /></a></span>
        </footer>
    )
}